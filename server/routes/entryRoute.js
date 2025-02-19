const express = require('express');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const router = express.Router();
const Entry = require('./../model/Entry');
const User = require('./../model/User');

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


module.exports = router;