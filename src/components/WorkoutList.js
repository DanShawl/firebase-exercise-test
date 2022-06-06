import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
// } from 'react-router-dom';
import './WorkoutList.css';
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
import InfoBox from './InfoBox';
import WorkoutItem from './WorkoutItem';
import AddIcon from '@mui/icons-material/Add';
import { ChevronLeft } from '@mui/icons-material';

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
  const infoTitle = 'Client Overview';
  const infoDx = 'Diagnosis';
  const infoEval = 'Evaluation';

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

  const clientRef = doc(db, `users/${currentUser}/clients/${currentClient}`);

  const workoutsCollectionRef = collection(
    db,
    `users/${currentUser}/clients/${currentClient}/workouts`
  );
  const [workouts, setWorkouts] = useState([]);
  // console.log(workouts);

  const createWorkout = async (e) => {
    e.preventDefault();
    // const workoutsCollectionRef = collection(
    //   db,
    //   `users/${currentUser}/clients/${currentClient}/workouts`
    // );

    await addDoc(workoutsCollectionRef, {
      title: workoutTitle,
      timestamp: serverTimestamp(),
    });
    setOpenInput(false);
    setWorkoutTitle('');
    // console.log(timestamp);
  };

  // const [clientRef, setClientRef] = useState({});
  // const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      setWorkouts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getWorkouts();
  }, [db]);

  // useEffect(() => {
  //   if (currentClient) {
  //     onSnapshot(
  //       query(getDocs(db, workoutsCollectionRef), orderBy('timestamp', 'desc')),
  //       (snapshot) => {
  //         setWorkouts(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             workout: doc.data(),
  //             // firstName: doc.data().eval.firstName,
  //             // lastName: doc.data().eval.lastName,
  //           }))
  //         );
  //       }
  //     );
  //   }
  // }, [currentClient]);

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
    <div className="workout__list">
      <div className="workout__list-nav" onClick={() => setCurrentClient('')}>
        <ChevronLeft />
        <p>Client List</p>
      </div>
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
      <InfoBox
        infoTitle={infoTitle}
        infoSubTitle={infoDx}
        infoSubTitle2={infoEval}
        infoData={dx}
        infoData2={clientNote}
      />

      {!openInput ? (
        <button className="add__workout-btn">
          <AddIcon onClick={() => setOpenInput(true)} />
        </button>
      ) : null}

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
      ) : (
        workouts.map((workout) => (
          <WorkoutItem
            title={workout.title}
            dateOfWorkout={workout.timestamp}
          />
        ))
      )}
      {/* <h1>{currentClient}</h1> */}

      {/* <button onClick={addWorkout}> Add a workout</button> */}
      {/* {workouts.map((workout) => (
        <WorkoutItem title={workout.title} />
      ))} */}
      {/* {workouts.map((workout) => (
        <div>
          <h2>{workout.data().workoutName}</h2>
        

          {console.log(workout.data().timestamp.toDate())}
        </div>
      ))} */}
      {/* <h1>Current Client: {currentClient}</h1>
      <button onClick={(e) => setCurrentClient(null)}>
       
      </button> */}
      {/* <button onClick={() => setCurrentClient('')}>Go Back</button> */}
    </div>
  );
};

export default WorkoutList;
