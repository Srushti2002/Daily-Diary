import React, {useState, useEffect} from 'react';
import styles from '../styles/create.module.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { isAuthenticated } from './../utils/auth';
import Navbar from './navbar.js';
import useAuthRedirect from '../hooks/useAuthRedirect';
// import * as THREE from "three"; // Ensure Three.js is available
// import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function Create() {
  useAuthRedirect();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
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
    if (!isAuthenticated()) {
        navigate("/login"); // Redirect if not authenticated
    }
}, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // ✅ Get token before making request

    if (!token) {
      console.error(" No token found! User must log in.");
      return;
    }
    axios.post(`${API_BASE_URL}/create`,
    {title,
    content},
    {
      headers: { Authorization: `Bearer ${token}` } // ✅ Send token
    })
    .then(result => {console.log(console.log("✅ Success:", result.data));
    navigate("/view")
  }).catch(err => console.log(err.response?.data || err.message))
  }

  return (
    <div
      className="top-0 left-0 w-full h-screen flex justify-center items-center 
  bg-gradient-to-r from-[#bbddff] via-[#88aed4] to-[#697fa1] 
  animate-gradientMove 
  [background-size:400%_400%] 
  max-sm:bg-[#6185a9] max-sm:bg-none max-sm:animate-none
  max-sm:min-h-screen"
      style={{ overflow: 'auto' }} // Override global overflow: hidden
    >
      <div
        className="bg-[#ffffff] shadow-md flex flex-col w-3/5 h-[90%] pb-3 rounded-2xl max-xl:w-3/4 
  max-sm:w-full max-sm:h-full max-sm:rounded-none"
        style={{ overflow: 'auto' }} // Override global overflow: hidden
      >
        <div className="flex flex-row items-center justify-between bg-[#4863A0] px-7 max-xl:px-5 sticky top-0 z-10"
          style={{ overflow: 'visible' }}>
          <h2 className="text-3xl text-white py-2">Write</h2>
          <Navbar />
        </div>
        <form
          className="flex flex-col gap-2 flex-grow px-7 py-2 max-sm:gap-1 max-sm:px-4"
          onSubmit={handleSubmit}
          style={{ overflow: 'auto', minHeight: '0' }}
        >
          <div className="flex flex-col mb-3" style={{ overflow: 'visible' }}>
            <label
              className="text-[#545454] font-semibold text-2xl pl-2 pb-1 max-sm:text-xl"
              htmlFor="title"
              style={{ overflow: 'visible' }}
            >
              Title
            </label>
            <input
              className="px-2 py-3 bg-[#F3F5F8] text-[#545454] border border-[#949494] 
    text-[20px] rounded-[10px] transition-all duration-100 focus:border-2 
    focus:border-[#949494] focus:outline-none placeholder:text-[#b4b4b4] placeholder:opacity-100
    max-sm:text-base max-sm:py-2"
              type="text"
              placeholder="Add a title to this story"
              value={title}
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              style={{ overflow: 'visible', height: 'auto', minHeight: '50px' }}
            />
          </div>
          <div className="flex flex-col flex-grow mb-3" style={{ overflow: 'visible', display: 'flex' }}>
            <label
              className="text-2xl pl-2 pb-1 text-[#545454] font-semibold max-sm:text-xl"
              htmlFor="story"
              style={{ overflow: 'visible' }}
            >
              Story
            </label>
            <textarea
              className="flex-grow px-2 py-3 bg-[#F3F5F8] text-[#545454] border border-[#949494] 
    text-[20px] rounded-[10px] transition-all duration-100 focus:border-2 
    focus:border-[#949494] focus:outline-none placeholder:text-[#b4b4b4] placeholder:opacity-100
    max-sm:text-base max-sm:py-2"
              placeholder="Write something..."
              id="story"
              name="story"
              value={content}
              style={{
                resize: "none",
                overflowY: "auto",
                flex: 1,
                minHeight: '200px',
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-start items-center py-2" style={{ overflow: 'visible' }}>
            <button
              className="text-[#E8EAE5] no-underline m-[5px] bg-[#4863A0] text-[20px] px-[30px] py-[7px] rounded-[10px] border border-[#B5CBED] max-sm:rounded-[30px]" 
              type="submit"
              style={{ overflow: 'visible' }}
            >
              Save
            </button>
            <Link
              className="text-[#E8EAE5] no-underline m-[5px] bg-[#4863A0] text-[20px] px-[30px] py-[7px] rounded-[10px] border border-[#B5CBED] max-sm:rounded-[30px]" 
              to="/view"
              style={{ overflow: 'visible' }}
            >
              View
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
