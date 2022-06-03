import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './WorkoutItem.css';

const WorkoutItem = ({ title, dateOfWorkout }) => {
  return (
    <div className="workout__card">
      <h2>{title}</h2>
      {console.log(dateOfWorkout)}
      {/* date */}
      {/* Chevron */}
    </div>
  );
};

export default WorkoutItem;
