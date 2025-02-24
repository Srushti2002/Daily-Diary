import React, {useState, useEffect, useRef} from 'react';
import styles from '../styles/signup.module.css';
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
    
    
    const API_BASE_URL =
    process.env.REACT_APP_NODE_ENV === "development"
        ?  "http://localhost:5000"  // Local API
        : "https://daily-diary-ekkt.onrender.com"; // Hosted API
         

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
        <div className={styles.signWrapper} ref={myRef}>
            <div className={styles.signContainer}>
                <h1>Signup</h1>
                <form className={styles.signForm} onSubmit={handleSubmit}>
                <div className={styles.signField}>
                    {/* <label htmlFor='name'>Name</label> */}
                    <input type="text"
                    className={styles.signInput}
                    placeholder="Name"
                    autoComplete="off"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.signField}>
                    {/* <label htmlFor='email'>Email</label> */}
                    <input type="email"
                    className={styles.signInput}
                    placeholder="Email"
                    autocomplete="off"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.signField}>
                    {/* <label htmlFor='password'>Password</label> */}
                    <input type="password"
                    className={styles.signInput}
                    placeholder="password"
                    id="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className={styles.signSubmit} type="submit">Submit</button>
                </form>
                <p>Already have an account?</p>
                <Link  className={styles.signLink} to="/login">login</Link>
            </div>
        </div>
    )
}
