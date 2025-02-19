import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from '../styles/edit.module.css';
import axios from 'axios';

export default function Edit() {

  const {entryID} = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({title: '', content: ''});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/view/${entryID}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => setEntry(response.data))
    .catch(error => console.error('Error fetchimh entry:', error))
  }, [entryID]);

  const handleEditToggle = () => {
    if (isEditing) {
      axios.put(`http://localhost:5000/view/${entryID}`, entry, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      })
      .then(() => alert('Entry Updated Successfully'))
      .catch(error => console.log('Error updating entry:', error));
    }
    setIsEditing(!isEditing);
  }

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this entry')) {
      axios.delete(`http://localhost:5000/view/${entryID}`, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      })
      .then(() => {
        alert('Entry deleted Successfully');
        navigate('/view');
      })
      .catch(error => console.error('Error deleting entry:', error))
    }
  }
  return (
    <div className={styles.editWrapper}>
      <div className={styles.editContainer}>
        <div className={styles.editField}>
          <input 
            className={styles.editTitleInput}
            type="text"
            value={entry.title}
            onChange={(e) => setEntry({...entry, title: e.target.value })}
            disabled={!isEditing}
          />
          <textarea 
            className={styles.editContentArea}
            value={entry.content}
            onChange={(e) => setEntry({...entry, content: e.target.value })}
            disabled={!isEditing}
            style={{ resize: "none", overflowY: "auto", scrollbarWidth: "none" }}
          />
        </div>
        <div className={styles.editButton}>
          <button className={styles.editSaveButton} onClick={handleEditToggle}>{isEditing ? 'Save': 'Edit'}</button>
          <button className={styles.editDeleteButton} onClick={handleDelete}>Delete</button>
        </div>
        </div>
    </div>
  )
}