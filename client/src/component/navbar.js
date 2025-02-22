import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navbar.module.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation(); // Get current page

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        const closeMenuOutsideClick = (event) => {
            const targetElement = event.target;

            if(!targetElement.closest(`.${styles.menu}`) && !targetElement.closest(`${styles.hamburgerMenu}`)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenuOutsideClick);

        return () => {
            document.removeEventListener('click', closeMenuOutsideClick);
        };
    }, [])

    return (
        <div className={styles.navWrapper} data-page={location.pathname.substring(1) || "create"}>
            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <div className={styles.hamburgerMenu} onClick={toggleMenu}>
                    <div className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`}/>
                    <div className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`}/>
                    <div className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`}/>
                        {menuOpen ? 
                        <ul className={styles.menuList}>
                            <li>
                                <Link className={styles.linkStyle} to="/">Signup</Link>
                            </li>
                            <li>
                                <Link className={styles.linkStyle} to="/login">Login</Link>
                            </li>
                            <li>
                                <Link className={styles.linkStyle} to="/create">Create</Link>
                            </li>
                            <li>
                                <Link className={styles.linkStyle} to="/view">View</Link>
                            </li>
                        </ul>:
                        <div></div>
                        }
                </div>
            </div>
        </div>
    )
}
