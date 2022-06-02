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
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import InputModal from './InputModal';

//  Data needed:
//    1.  Current client name / currentUser
//    2.  Client diagnosis
//    3.  Add new workout button w/ modal
//    4.  Add previous workout button
//    5.  List of all previous workouts

const WorkoutList = ({
  setCurrentClient,
  currentClient,
  currentUser,
  setOpenModal,
}) => {
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const modalTitle = 'Create Workout';
  const inputPlaceholder = 'Enter a workout title...';

  const [dx, setDx] = useState('');
  const [firstName, setFirstName] = useState('');
  const [clientNote, setClientNote] = useState('');

  // const [month, setMonth] = useState('');

  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  // useEffect(() => {
  //   const date = new Date().getMonth();
  //   setMonth(months[date]);
  //   console.log(month);

  // }, []);

  const createWorkout = async (e) => {
    e.preventDefault();

    await addDoc(workoutsCollectionRef, {
      title: workoutTitle,
      serverTimestamp: serverTimestamp(),
      // timestamp:
    });
    setOpenInput(false);
  };

  // const [clientRef, setClientRef] = useState({});
  // const [workouts, setWorkouts] = useState([]);

  const clientRef = doc(db, `users/${currentUser}/clients/${currentClient}`);

  const workoutsCollectionRef = collection(
    db,
    `users/${currentUser}/clients/${currentClient}/workouts`
  );
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      setWorkouts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getWorkouts();
  }, []);

  useEffect(() => {
    const getClientData = async () => {
      const data = await getDoc(clientRef);

      setFirstName(data.data().firstName);
      setDx(data.data().dx);
      setClientNote(data.data().clientNote);
      // console.log(data.data());
    };
    getClientData();
  }, []);

  console.log(firstName);
  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(
  //           db,
  //           `users/${currentUser}/clients/${currentClient}/workouts`
  //         ),
  //         orderBy('timestamp', 'desc')
  //       ),
  //       (snapshot) => {
  //         //  everytime the value in the backend changes, it updates the react state with the latest docs
  //         setWorkouts(snapshot.docs);
  //       }
  //     ),

  //   [db]
  // );

  // const getName = async () => {
  //   const docRef = doc(db, `users/${currentUser}/clients/${currentClient}`);
  //   const docSnap = await getDoc(docRef);
  //   // const clientRef = await getDoc(collection(db, `users/${currentUser}/clients/${currentClient}`))

  //   if (docSnap.exists()) {
  //     setClientName(docSnap.data().firstName + ' ' + docSnap.data().lastName);
  //     // setClientDx(docSnap.data().dx);
  //   }
  // };
  // getName();

  // const addWorkout = (e) => {
  //   e.preventDefault();

  //   if (currentUser && currentClient) {
  //     const workoutsRef = collection(
  //       db,
  //       `users/${currentUser}/clients/${currentClient}/workouts`
  //     );

  //     //  adding doc with named id
  //     // setDoc(doc(workoutsRef, `workout-name`), {
  //     //   workoutName: 'Gains',
  //     //   exercise: 'Pull Up',
  //     //   timestamp: serverTimestamp(),
  //     //   // workoutNumber: workoutCounter + 1,
  //     // });
  //     // console.log(serverTimestamp);
  //     addDoc(workoutsRef, {
  //       workoutName: 'Patellar',
  //       exercise: 'Deadlift',
  //       timestamp: serverTimestamp(),
  //     });
  //   }

  //   //  adding doc with auto id
  // };
  // let id = useParams();

  return (
    <div>
      {openInput && (
        <InputModal
          inputValue={workoutTitle}
          setInputValue={setWorkoutTitle}
          setOpenInput={setOpenInput}
          modalTitle={modalTitle}
          inputPlaceholder={inputPlaceholder}
          createFunction={createWorkout}
        />
      )}
      {!workouts.length ? (
        <div className="">
          <div className="noClient__container">
            <h2>{firstName} has no workouts yet. Create one to get started.</h2>
            {/* <h2>workout for {currentClient.split('_', 1)}</h2> */}
            <button
              className="btn__addClient"
              onClick={() => setOpenInput(true)}
            >
              {/* <AddIcon fontSize="small" /> */}
              <span>Create Workout</span>
            </button>
          </div>
        </div>
      ) : null}
      {/* <h1>{currentClient}</h1> */}

      {/* <button onClick={addWorkout}> Add a workout</button> */}
      {workouts.map((workout) => (
        <div>
          <h2>{workout.title}</h2>
          {/* {console.log(workout.serverTimestamp)} */}
          {/* {console.log(workout.timestamp.toDate())} */}
        </div>
      ))}
      {/* {workouts.map((workout) => (
        <div>
          <h2>{workout.data().workoutName}</h2>
        

          {console.log(workout.data().timestamp.toDate())}
        </div>
      ))} */}
      {/* <h1>Current Client: {currentClient}</h1>
      <button onClick={(e) => setCurrentClient(null)}>
       
      </button> */}
      <button onClick={() => setCurrentClient('')}>Go Back</button>
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  );
};

export default WorkoutList;
