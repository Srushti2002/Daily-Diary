import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isViewPage = location.pathname === "/view";
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }
    

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const closeMenuOutsideClick = (event) => {
            if (!event.target.closest('.menu') && !event.target.closest('.hamburgerMenu')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenuOutsideClick);
        return () => {
            document.removeEventListener('click', closeMenuOutsideClick);
        };
    }, []);

    return (
        <div className="flex justify-end p-6 relative" data-page={location.pathname.substring(1) || "create"}>
            <div className={`menu ${menuOpen ? 'menuOpen' : ''}`}>
                <div className="hamburgerMenu flex flex-col cursor-pointer" onClick={toggleMenu}>
                    <div className={`bar w-9 h-[3px] bg-white my-[3px] transition-transform ${menuOpen ? 'rotate-[-45deg] translate-x-[-8px] translate-y-[8px]' : ''}`}/>
                    <div className={`bar w-9 h-[3px] bg-white my-[3px] transition-opacity ${menuOpen ? 'opacity-0' : ''}`}/>
                    <div className={`bar w-9 h-[3px] bg-white my-[3px] transition-transform ${menuOpen ? 'rotate-[45deg] translate-x-[-8px] translate-y-[-8px]' : ''}`}/>
                </div>
                {menuOpen && (
                    <ul className={`fixed bg-[#4863A0] text-white rounded-lg shadow-lg flex items-center justify-center 
                    flex-col text-center m-[1em] z-50 translate-x-[-50%]
                    ${isViewPage ? 'top-[11%] left-[71%]  max-xl:left-[77%] max-lg:left-[71%]  max-md:left-[63%] max-sm:top-[6%] max-sm:left-[45.5%]' : 
                    'top-[11%] left-[69%] max-xl:left-[76%] max-lg:left-[70%] max-md:left-[65%] max-sm:left-[45.5%] max-sm:top-[6%]'}`} 
                    data-page={location.pathname.substring(1) || "create"}>
                        <li className="w-[15vw] border border-white text-center max-lg:w-[25vw] max-md:w-[35vw] max-sm:w-[90vw]">
                            <Link className="block text-white py-2 text-lg mx-1 " to="/">Signup</Link>
                        </li>
                        <li className="w-[15vw] border border-white text-center max-lg:w-[25vw]  max-md:w-[35vw] max-sm:w-[90vw]">
                            <Link className="block text-white py-2 text-lg mx-1" to="/login">Login</Link>
                        </li>
                        <li className="w-[15vw] border border-white text-center max-lg:w-[25vw]  max-md:w-[35vw] max-sm:w-[90vw]">
                            <Link className="block text-white py-2 text-lg mx-1" to="/create">Create</Link>
                        </li>
                        <li className="w-[15vw] border border-white text-center max-lg:w-[25vw]  max-md:w-[35vw] max-sm:w-[90vw]">
                            <Link className="block text-white py-2 text-lg mx-1" to="/view">View</Link>
                        </li>
                        <li className="w-[15vw] border border-white text-center max-lg:w-[25vw]  max-md:w-[35vw] max-sm:w-[90vw]">
                            <Link className="block text-white py-2 text-lg mx-1" onClick={handleLogout} to="/login">logout</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
