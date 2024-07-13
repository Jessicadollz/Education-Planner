import React from 'react';
import './Planner.css';

const Planner = ({ subject, hours, onIncrement, onDecrement, onDelete}) => {
    const handleDelete = () => {
        onDelete();
      };
    
    return (
        <>
            <div className="row">
                <span>{subject} - {hours}</span>
                <span className="btngroup">
                    <button className='decrement' onClick={onDecrement}>Decrement</button>
                    <button className='increment' onClick={onIncrement}>Increment</button>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                </span>
            </div>
        </>
    );
};

export default Planner;