import React, {useState, useEffect, useRef} from 'react';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as THREE from "three"; // Ensure Three.js is available
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signField = "flex flex-col justify-center w-full pb-4 m-0";
    const signInput = "w-full p-2 bg-[#eeeeee] border-[#717171] px-2 rounded-sm";
    
    // const API_BASE_URL =
    // process.env.NODE_ENV === "development"
    //     ?  "http://localhost:5000"  // Local API
    //     : "https://daily-diary-ekkt.onrender.com"; // Hosted API
    
    const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_BASE_URL  // Hosted API
        : process.env.REACT_APP_API_BASE_URL_PROD;  // Local API  

    console.log("API BASE URL:", API_BASE_URL); // Debugging log

    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);
  
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
        axios.post(`${API_BASE_URL}/signup`, 
        {name, 
        email, 
        password})
        .then(result => {console.log(result);
        navigate("/login")
    }).catch(err => console.log(err))
    }
    return (
        // <div className={styles.signWrapper} ref={myRef}>
        //     <div className={styles.signContainer}>
        //         <h1 className="text-3xl font-bold underline">Signup</h1>
        //         <form className={styles.signForm} onSubmit={handleSubmit}>
        //         <div className={styles.signField}>
        //             {/* <label htmlFor='name'>Name</label> */}
        //             <input type="text"
        //             className={styles.signInput}
        //             placeholder="Name"
        //             autoComplete="off"
        //             id="name"
        //             name="name"
        //             value={name}
        //             onChange={(e) => setName(e.target.value)}
        //             />
        //         </div>
        //         <div className={styles.signField}>
        //             {/* <label htmlFor='email'>Email</label> */}
        //             <input type="email"
        //             className={styles.signInput}
        //             placeholder="Email"
        //             autocomplete="off"
        //             id="email"
        //             value={email}
        //             name="email"
        //             onChange={(e) => setEmail(e.target.value)}
        //             />
        //         </div>
        //         <div className={styles.signField}>
        //             {/* <label htmlFor='password'>Password</label> */}
        //             <input type="password"
        //             className={styles.signInput}
        //             placeholder="password"
        //             id="password"
        //             name='password'
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}/>
        //         </div>
        //         <button className={styles.signSubmit} type="submit">Submit</button>
        //         </form>
        //         <p>Already have an account?</p>
        //         <Link  className={styles.signLink} to="/login">login</Link>
        //     </div>
        // </div>
        <div className="h-screen flex justify-center items-center md:p-0 sm:m-0" ref={myRef}>
            <div className="bg-[#FBFDFF] shadow-md flex flex-col px-7 py-5 leading-[2] rounded-2xl justify-center  max-w-[360px] opacity-95 w-1/2 
            max-sm:bg-gradient-to-b max-sm:from-[#88aed4] max-sm:via-[#a5a3b7] max-sm:to-[#9bafcc] max-sm:w-full max-sm:max-w-full max-sm:h-full max-sm:rounded-none">
                <h1 className="text-2xl pb-2 font-bold text-black-500 text-center">Create Account</h1>
                <h6 className='text-center pb-4'>Join us today and start your journey</h6>
                <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
                 <div className={signField}>
                    <label htmlFor='name'>Name</label>
                    <input type="text"
                    className={signInput}
                    placeholder="Enter your name"
                    autoComplete="off"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={signField}>
                    <label htmlFor='email'>Email</label>
                    <input type="email"
                    className={signInput}
                    placeholder="Enter your email"
                    autocomplete="off"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={signField}>
                    <label htmlFor='password'>Password</label>
                    <input type="password"
                    className={signInput}
                    placeholder="Enter your password"
                    id="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="bg-blue-700 border-none text-[#E8EAE5] text-lg my-6 px-[5px] py-[10px] rounded-[5px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110 " type="submit">Submit</button>
                </form>
                <p className='text-center'>Already have an account?</p>
                <Link  className="underline-none text-center text-blue-700" to="/login">login</Link>
            </div>
        </div>
    )
}
