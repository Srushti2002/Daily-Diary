const express = require('express');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const router = express.Router();
const Entry = require('./../model/Entry');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const moodMapping = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    scared: "😨",
    neutral: "😐",
    tired: "😮‍💨"
};

//Create the diary page - POST
router.post('/create', jwtAuthMiddleware, async (req, res) => {
    console.log("🔹 Incoming Request:", req.body);
    console.log("🔹 Headers:", req.headers);
    console.log("🔹 User from JWT:", req.user);
    try{
        const userId = req.user?.id; 
        const {title, content}= req.body; // Assuming the request body contains candidates data
        const newEntry = new Entry({
            title,
            content,
            userId
        });

        const response = await newEntry.save();
        console.log('Data saved');
        res.status(200).json({response: response});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

//Get the list of diary pages written by particualr user
router.get('/view', jwtAuthMiddleware, async(req, res) => {
    try{
        const userId = req.user.id;
        const data = await Entry.find({userId});
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/view/:entryID', jwtAuthMiddleware, async(req, res) => {
    try{
        const entryID = req.params.entryID;
        const entry = await Entry.findById(entryID);

        if(!entry) {
            return res.status(404).json({error : 'Entry not found'})
        }

        res.status(200).json(entry);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})

//Update the data in diary
router.put('/view/:entryID', jwtAuthMiddleware, async(req, res) => {
    try{
        const entryID = req.params.entryID;
        const updatedEntryData = req.body;

        const response = await Entry.findByIdAndUpdate(entryID, updatedEntryData, {
            new: true,
            runValidators: true,
        });

        if(!response) {
            return res.status(404).json({error : 'Entry not found'})
        }

        console.log("Data updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/view/:entryID', jwtAuthMiddleware, async(req, res) => {
    try{
        const entryID = req.params.entryID;

        const response = await Entry.findByIdAndDelete(entryID);

        if(!response) {
            return res.status(404).json({error : "Entry not found"})
        }

        console.log('Entry Deleted');
        res.status(200).json(response);

    }
    catch{
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'})
    }
})

router.post("/view/aiInsights", jwtAuthMiddleware, async(req,res) => {
    try{
        const { entryId } = req.body;

        if(!entryId) {
            return res.status(400).json({error: "Entry ID is required" });
        }

        const entry = await Entry.findById(entryId);
        if(!entry) {
            return res.status(404).json({error : "Entry not found"});
        }

        const prompt = `
        You are an AI that analyzes diary entries.
        Analyze the following diary entry and determine the mood of the writer (choose from: happy, sad, excited, scared, neutral).
        Then, provide a short three-line summary of their day.
        
        Diary Entry:
        Title: ${entry.title}
        Content: ${entry.content}
        
        Provide the response in this JSON format:
        {
            "mood": "<mood>",
            "summary": "<three-line summary>"
        }`

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const modelResponse = await model.generateContent(prompt);
         
        let aiText = modelResponse.response.text();

        aiText = aiText.replace(/```json|```/g, "").trim();

        let aiData;
        try{
            aiData = JSON.parse(aiText);
        }catch(error) {
            console.log("AI response is not in JSON format. Extracting manually.");
            const moodMatch = aiText.match(/(happy|sad|excited|scared|neutral|tired)/i);
            aiData = {
                mood: moodMatch ? moodMatch[0].toLowerCase() : "happy",
                summary: aiText.replace(moodMatch ? moodMatch[0] : "", "").trim()
            };
        }

        res.json({
            mood: aiData.mood,
            emoji: moodMapping[aiData.mood] || "😐",
            summary: aiData.summary
        });
    }
    catch(error){
        res.status(500).json({error : "Server error"});
    }
})


module.exports = router;