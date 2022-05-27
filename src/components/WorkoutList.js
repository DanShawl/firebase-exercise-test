import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
// } from 'react-router-dom';

import {
  setDoc,
  collection,
  onSnapshot,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
//  Data needed:
//    1.  Current client name / currentUser
//    2.  Client diagnosis
//    3.  Add new workout button w/ modal
//    4.  Add previous workout button
//    5.  List of all previous workouts

const WorkoutList = ({ setCurrentClient, currentClient }) => {
  // console.log(currentClient);
  // const addWorkout = (e) => {
  //   e.preventDefault();
  //   // const clientRef = doc(db, `clients/${currentClient}`);
  //   console.log(currentClient);
  //   if (currentUser && currentClient) {
  //     const workoutsRef = collection(
  //       db,
  //       `users/${currentUser}/clients/${currentClient}/workouts`
  //     );

  //     //  adding doc with named id
  //     setDoc(doc(workoutsRef, `workout-name`), {
  //       workoutName: 'Gains',
  //       exercise: 'Pull Up',
  //       timestamp: serverTimestamp(),
  //       // workoutNumber: workoutCounter + 1,
  //     });
  //     // console.log(serverTimestamp);
  //   }

  //   // //  adding doc with auto id
  //   // addDoc(workoutsRef, {
  //   //   workoutName: 'Patellar ',
  //   //   exercise: 'Deadlift',
  //   // });
  // };
  // let id = useParams();
  return (
    <div>
      {/* <h1>Current Client: {currentClient}</h1>
      <button onClick={(e) => setCurrentClient(null)}>
       
      </button> */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  );
};

export default WorkoutList;
