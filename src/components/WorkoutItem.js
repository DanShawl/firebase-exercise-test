import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './WorkoutItem.css';

const WorkoutItem = ({ title, dateOfWorkout }) => {
  return (
    <div className="workout__card">
      <div className="workout__card-info">
        <h2>{title}</h2>
        <p>{new Date(dateOfWorkout.seconds * 1000).toDateString()}</p>
      </div>
      <ChevronRightIcon />
      {/* {console.log(dateOfWorkout)} */}
      {/* {console.log(new Date(dateOfWorkout.seconds * 1000).toDateString())} */}
      {/* date */}
      {/* Chevron */}
    </div>
  );
};

export default WorkoutItem;
