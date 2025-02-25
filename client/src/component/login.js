import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/login.module.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as THREE from "three"; // Ensure Three.js is available
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);
    
    // const API_BASE_URL =
    // process.env.NODE_ENV === "development"
    //     ?  "http://localhost:5000"  // Local API
    //     : "https://daily-diary-ekkt.onrender.com"; // Hosted API

    const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_BASE_URL  // Hosted API
        : process.env.REACT_APP_API_BASE_URL_PROD;  // Local API

    console.log("API BASE URL:", API_BASE_URL); // Debugging log


    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(
          CLOUDS({
            el: myRef.current,
            THREE: THREE, // Required for React
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
          })
        );
      }
  
      return () => {
        if (vantaEffect) vantaEffect.destroy(); // Cleanup effect on unmount
      };
    }, [vantaEffect]);

    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${API_BASE_URL}/login`,
        {
            email,
            password
        })
        .then(result => {
            console.log(result);
            console.log("API BASE URL:", API_BASE_URL);
            if(result.data) {
                localStorage.setItem('token', result.data)
                navigate("/create")
            }
        })
        .catch(err => {
            console.log(err);
            if (err.response) {
                console.log(err.response); // Show the exact message from the backend
                alert("You are not registered to this service");
                navigate("/");

            } else {
                alert("Something went wrong. Please try again.");
            }
        });
    }
    
    return (
        <div className={styles.logWrapper}  ref={myRef}>
            <div className={styles.logContainer}>
                <h1>Login</h1>
                <form className={styles.logForm} onSubmit={handleSubmit}>
                    <div className={styles.logField}>
                        <input
                        className={styles.logInput}
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        id="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.logField}>
                        <input
                        className={styles.logInput}
                        type="password"
                        placeholder="password"
                        autoComplete="off"
                        id="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button className={styles.logSubmit} type="submit">Submit</button>
                </form>
                <p>Don't have an account ?</p>
                <Link className={styles.logLink} to="/">Signup</Link>
            </div>
        </div>
    )
}