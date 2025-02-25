import { Link } from "react-router-dom";
import styles from "../styles/notFound.module.css";
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from "three"; // Ensure Three.js is available
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function NotFound() {
    
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
  return (
    <div className={styles.notFoundWrapper} ref={myRef}>
        <div className={styles.notFoundContainer}>
            <h1 className={styles.notFoundHeading}>404 - Page Not Found</h1>
            <p className={styles.notFoundContent}>The page you're looking for doesn't exist.</p>
            <Link  className={styles.notFoundLink} to="/" >
                Go Back 
            </Link>
        </div>
    </div>
  );
};


