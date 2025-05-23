import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from '../styles/edit.module.css';
import Navbar from './navbar.js';
import axios from 'axios';

export default function Edit() {

  const {entryID} = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({title: '', content: ''});
  const [isEditing, setIsEditing] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [showPopup, setShowpopup] = useState(false);

  
  // const API_BASE_URL =
  //   process.env.NODE_ENV === "development"
  //       ?  "http://localhost:5000"  // Local API
  //       : "https://daily-diary-ekkt.onrender.com"; // Hosted API

  const API_BASE_URL =
  process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL  // Hosted API
      : process.env.REACT_APP_API_BASE_URL_PROD;  // Local API

  console.log("API BASE URL:", API_BASE_URL); // Debugging log

  useEffect(() => {
    axios.get(`${API_BASE_URL}/view/${entryID}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => setEntry(response.data))
    .catch(error => console.error('Error fetchimh entry:', error))
  }, [entryID, API_BASE_URL]);

  const handleEditToggle = () => {
    if (isEditing) {
      axios.put(`${API_BASE_URL}/view/${entryID}`, entry, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      })
      .then(() => alert('Entry Updated Successfully'))
      .catch(error => console.log('Error updating entry:', error));
    }
    setIsEditing(!isEditing);
  }

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this entry')) {
      axios.delete(`${API_BASE_URL}/view/${entryID}`, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      })
      .then(() => {
        alert('Entry deleted Successfully');
        navigate('/view');
      })
      .catch(error => console.error('Error deleting entry:', error))
    }
  }

const handleAiInsights = async () => {
  try{
      const response = await axios.post(`${API_BASE_URL}/view/aiInsights`, 
      {entryId: entryID},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setAiData(response.data);
      setShowpopup(true);
  }
  catch(error) {
    console.error("Error fetching AI insights: ", error);
    alert("Failed to fetch AI insights. Please try again.");
  }
};

  return (<div
    className="top-0 left-0 w-full h-screen flex justify-center items-center 
  bg-gradient-to-r from-[#bbddff] via-[#88aed4] to-[#697fa1] 
  animate-gradientMove 
  [background-size:400%_400%] 
  max-sm:bg-[#6185a9] max-sm:bg-none max-sm:animate-none
  max-sm:min-h-screen"
    style={{ overflow: "auto" }}
  >
    <div
      className="bg-[#edf0f4] shadow-md flex flex-col w-3/5 h-[90%] pb-3 rounded-2xl max-xl:w-3/4 
    max-sm:w-full max-sm:h-full max-sm:rounded-none"
      style={{ overflow: "auto" }}
    >
      <div 
        className="flex flex-row items-center justify-between bg-[#4863A0] px-7 max-xl:px-5 sticky top-0 z-10"
        style={{ overflow: "visible" }}
      >
        <h2 className="text-3xl text-white py-2">Diary</h2>
        <Navbar />
      </div>
      <div 
        className="flex flex-col gap-2 flex-grow px-7 py-2 max-sm:gap-1 max-sm:px-4"
        style={{ overflow: "auto", minHeight: "0" }}
      >
        <div className="flex flex-col mb-3" style={{ overflow: "visible" }}>
          <label
            className="text-[#545454] font-semibold text-2xl pl-2 pb-1 max-sm:text-xl"
            htmlFor="title"
            style={{ overflow: "visible" }}
          >
            Title
          </label>
          <input
            className="px-2 py-3 bg-[#F3F5F8] text-[#545454] border border-[#949494] 
            text-[20px] rounded-[10px] transition-all duration-100 focus:border-2 
            focus:border-[#949494] focus:outline-none placeholder:text-[#b4b4b4] placeholder:opacity-100
            max-sm:text-base max-sm:py-2"
            type="text"
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            disabled={!isEditing}
            style={{ overflow: "visible", height: "auto", minHeight: "50px" }}
          />
        </div>
        <div 
          className="flex flex-col flex-grow mb-3"
          style={{ overflow: "visible", display: "flex" }}
        >
          <label
            className="text-2xl pl-2 pb-1 text-[#545454] font-semibold max-sm:text-xl"
            htmlFor="story"
            style={{ overflow: "visible" }}
          >
            Story
          </label>
          <textarea
            className="flex-grow px-2 py-3 bg-[#F3F5F8] text-[#545454] border border-[#949494] 
            text-[20px] rounded-[10px] transition-all duration-100 focus:border-2 
            focus:border-[#949494] focus:outline-none placeholder:text-[#b4b4b4] placeholder:opacity-100
            max-sm:text-base max-sm:py-2"
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            disabled={!isEditing}
            style={{
              resize: "none",
              overflowY: "auto",
              flex: 1,
              minHeight: "200px",
            }}
          />
        </div>
        <div 
          className="flex flex-row justify-start items-center py-2"
          style={{ overflow: "visible" }}
        >
          <button
             className="text-[#E8EAE5] no-underline m-[5px] bg-[#4863A0] text-[20px] px-[30px] py-[7px] rounded-[10px] border border-[#B5CBED] max-sm:rounded-[30px]" 
             onClick={handleEditToggle}
            style={{ overflow: "visible" }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button className="text-[#E8EAE5] no-underline m-[5px] bg-[#4863A0] text-[20px] px-[30px] py-[7px] rounded-[10px] border border-[#B5CBED] max-sm:rounded-[30px]" type="submit" onClick={handleDelete}>Delete</button>
          <button className="text-[#E8EAE5] no-underline m-[5px] bg-[#4863A0] text-[20px] px-[30px] py-[7px] rounded-[10px] border border-[#B5CBED] max-sm:rounded-[30px]" type="submit" onClick={handleAiInsights}>moodAI</button>
          {showPopup && aiData && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h3 className="text-xl font-semibold mb-2">Ai Insights</h3>
                <p className="text-lg"><strong>Mood:</strong>{aiData.mood} {aiData.emoji}</p>
                <p className="text-gray-700">{aiData.summary}</p>
                <button 
                className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setShowpopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
    </div>
  )
}