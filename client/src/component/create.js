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
  
  const API_BASE_URL =
  process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_API_BASE_URL_PROD  // Hosted API
      : process.env.REACT_APP_API_BASE_URL;  // Local API

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
    <div className={styles.createWrapper} 
    // ref={myRef}
    >
      <div className={styles.createContainer} >
        <div className={styles.createNavigation} >
          <Navbar />
        </div>
        <form className={styles.createForm} onSubmit={handleSubmit}>
        <div className={styles.createField}>
          <input 
           className={styles.createInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
          <textarea
           className={styles.createTextArea}
          placeholder="Content"
          value={content}
          style={{ resize: "none", overflowY: "auto", scrollbarWidth: "none" }}
          onChange={(e) => setContent(e.target.value)}/>
        </div>
        <div className={styles.createButton}>
          <button className={styles.createSubmit} type="submit">Save</button>
          <Link className={styles.createLink}to='/view'>View</Link>
        </div>
      </form>
      </div>
    </div>
  )
}
