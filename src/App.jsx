import React, { useState, useEffect } from 'react';
import './App.css';
import Planner from './Components/Planner.jsx';

const STORAGE_KEY = 'geekster-planner-data'; // Define a key for local storage

function App() {
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage on page load
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedData) {
      setSubjects(storedData);
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleAddClick = () => {
    if (subject && hours) {
      const newSubjects = [...subjects, { subject, hours: parseInt(hours) }];
      setSubjects(newSubjects);
      setSubject('');
      setHours('');
      saveToLocalStorage(newSubjects);
    }
  };

  const handleIncrement = (index) => {
    const newSubjects = [...subjects];
    newSubjects[index].hours += 1;
    setSubjects(newSubjects);
    saveToLocalStorage(newSubjects);
  };

  const handleDecrement = (index) => {
    const newSubjects = [...subjects];
    if (newSubjects[index].hours > 0) {
      newSubjects[index].hours -= 1;
      setSubjects(newSubjects);
      saveToLocalStorage(newSubjects);
    }
  };

  const handleDelete = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
    saveToLocalStorage(newSubjects);
  };

  return (
    <div className="App">
      <h1 className='title' style={{ color: 'brown' }}>Geekster Education Planner</h1>
      <div className="wrapper">
        <input type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="number" placeholder="Enter No of hours" value={hours} onChange={(e) => setHours(e.target.value)} />
        <button onClick={handleAddClick}>Add</button>
      </div>

      <div className="subject-list">
        {subjects.map((item, index) => (
          <Planner
            key={index}
            subject={item.subject}
            hours={item.hours}
            onIncrement={() => handleIncrement(index)}
            onDecrement={() => handleDecrement(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;