import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import styles from "../styles/view.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Navbar from './navbar.js';
import Img from "../Img/girl.png"
import useAuthRedirect from '../hooks/useAuthRedirect';

export default function View() {
    useAuthRedirect();
    const [entries, setEntries] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const navigate = useNavigate();
    
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
        const fetchEntries = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/view`, {
                    headers: {authorization: `Bearer ${token}` }
                });
                setEntries(response.data);
            }
            catch(error) {
                console.log("Error fetching entries", error)
            }
        };
        fetchEntries();
    },[API_BASE_URL]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredEntries = selectedDate
    ? entries.filter(entry => new Date(entry.createdAt).toDateString() === selectedDate.toDateString())
    : entries;

    return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center 
    bg-gradient-to-r from-[#bbddff] via-[#88aed4] to-[#697fa1] 
    animate-gradientMove 
    [background-size:400%_400%] 
    max-sm:bg-[#6185a9] max-sm:bg-none max-sm:animate-none"
    >
        <div className="bg-[#edf0f4] gap-6 shadow-md flex flex-col w-[65%] h-[90%] pb-3 rounded-2xl max-xl:w-[80%]  max-sm:w-full max-sm:h-full max-sm:rounded-none">
           <div className="flex flex-row items-center justify-between bg-[#4863A0] px-7 max-xl:px-5">
            <h2 className="text-3xl text-white max-sm:text-2xl">View your entries</h2>
            <Navbar />
           </div>
           <div className="flex flex-row h-full px-6 py-2 gap-1 max-lx:gap-0.5rem max-sm:flex-col">
            <div className="flex flex-col gap-1 justify-center w-[45%] max-xl:w-[55%] max-lg:w-[70%] max-md:w-full max-sm:w-full max-sm:h-full max-sm:items-center max-sm:justify-center">
                <Calendar className="[width:300px] [height:500px] rounded-[10px] px-3/2 py-1 border-2 shadow-md max-md:[height:350px] max-sm:[height:300px] overflow-y-auto scrollbar-hide" onChange={handleDateChange} value={selectedDate} 
                maxDate={new Date()} // Restrict future dates
                tileClassName={({ date }) =>
                date.toDateString() === new Date().toDateString() ? styles.todayHighlight : ''
                }
                formatMonthYear={(locale, date) => date.toLocaleString(locale, { month: 'short', year: 'numeric' })}
                 />
                <img className="w-full h-full max-sm:hidden" src={Img} alt = "A girl"/>
            </div>
            <div className="flex flex-col items-center gap-1 w-full max-sm:mt-5 max-sm:h-full">
                <div className="flex flex-wrap justify-center gap-5 overflow-y-auto [scrollbar-width:none] max-sm:scroll-auto max-sm:gap-1">
                    {filteredEntries.length > 0 ? (
                        filteredEntries.map(entry=> (
                            <div className="bg-[#fff] border-2 border-[#717171] px-7 py-5 rounded-[5px_21px] text-center max-sm:w-5/6 max-sm:mb-3" key={entry._id} onClick={() => navigate(`/view/${entry._id}`)}>
                                <p className="text-sm max-sm:text-lg">{new Date(entry.createdAt).toDateString()}</p>
                            </div>
                        ))
                    ): (
                    <div className="flex flex-col justify-center items-center gap-2 max-sm:text-lg">
                        <p>No entries found for this day</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {entries.map(entry => (
                                <div className="bg-[#fff] border-2 border-[#717171] px-7 py-5 rounded-[5px_21px] text-center max-sm:w-5/6 max-sm:mb-3" key={entry._id} onClick={() => navigate(`/view/${entry._id}`)}>
                                    <p className="text-sm max-sm:text-lg">{new Date(entry.createdAt).toDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
    )}
                </div>
            </div>

           </div>

        </div>
    </div>
    )
    
}