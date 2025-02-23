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
    const API_BASE_URL = process.env.API_BASE_URL;

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
    },[]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredEntries = selectedDate
    ? entries.filter(entry => new Date(entry.createdAt).toDateString() === selectedDate.toDateString())
    : entries;

    return (
    <div className={styles.viewWrapper}>
        <div className={styles.viewContainer}>
           <div className={styles.viewTop}>
            <Navbar />
           </div>
           <div className={styles.viewBottom}>
            <div className={styles.viewLeftCol}>
            
            {/* <Calendar mode="single" className={styles.viewCalender} 
            selected={selectedDate} onSelect={handleDateChange} /> */}
                <Calendar className={styles.viewCalender} onChange={handleDateChange} value={selectedDate} 
                maxDate={new Date()} // Restrict future dates
                tileClassName={({ date }) =>
                date.toDateString() === new Date().toDateString() ? styles.todayHighlight : ''
                }
                formatMonthYear={(locale, date) => date.toLocaleString(locale, { month: 'short', year: 'numeric' })}
                 />
                <img className={styles.viewImg} src={Img} alt = "A girl"/>
            </div>
            <div className={styles.viewRightCol}>
                <h2 className={styles.viewHeading}>Your Diary Entries</h2>
                <div className={styles.viewEntries}>
                    {filteredEntries.length > 0 ? (
                        filteredEntries.map(entry=> (
                            <div className={styles.viewEntryEach} key={entry._id} onClick={() => navigate(`/view/${entry._id}`)}>
                                <p className={styles.viewEntryDate}>{new Date(entry.createdAt).toDateString()}</p>
                            </div>
                        ))
                    ): (
                    <div className={styles.viewNoEntry}>
                        <p>No entries found for this day</p>
                        <div className={styles.viewRemainingEntry}>
                            {entries.map(entry => (
                                <div className={styles.viewEntryEach} key={entry._id} onClick={() => navigate(`/view/${entry._id}`)}>
                                    <p className={styles.viewEntryDate}>{new Date(entry.createdAt).toDateString()}</p>
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