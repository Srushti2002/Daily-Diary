import React, { useState, useRef, useEffect } from 'react';
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
    const logField = "flex flex-col justify-center w-full pb-4 m-0";
    const logInput = "w-full p-2 bg-[#eeeeee] border-[#717171] px-2 rounded-sm";
    
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
        <div className="h-screen flex justify-center items-center md:p-0 sm:m-0" ref={myRef}>
            <div className="bg-[#FBFDFF] shadow-md flex flex-col px-7 py-5 leading-[2] rounded-2xl justify-center items-center max-w-[360px] opacity-95 w-1/2 
            max-sm:bg-gradient-to-b max-sm:from-[#88aed4] max-sm:via-[#a5a3b7] max-sm:to-[#9bafcc] max-sm:w-full max-sm:max-w-full max-sm:h-full max-sm:rounded-none">
                <h1 className="text-2xl pb-2 font-bold text-black-500">Welcome Back</h1>
                <h6 className='text-center pb-4'>Log in to access your account</h6>
                <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
                    <div className={logField}>
                        <label htmlFor='name'>Email</label>
                        <input
                        className={logInput}
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="off"
                        id="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={logField}>
                        <label htmlFor='password'>Password</label>
                        <input
                        className={logInput}
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="off"
                        id="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button  className="bg-blue-700 border-none text-[#E8EAE5] text-lg my-6 px-[5px] py-[10px] rounded-[5px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110 " type="submit">Submit</button>
                </form>
                <p className='text-center'>Don't have an account ?</p>
                <Link className="underline-none text-center text-blue-700" to="/">Signup</Link>
            </div>
        </div>
    )
}