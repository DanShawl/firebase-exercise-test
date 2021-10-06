import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';

import {
  setDoc,
  collection,
  onSnapshot,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db, auth } from './firebase';
import Dashboard from './components/Dashboard';

function App() {
  //  user authentication state
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmailError, setUserEmailError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState('');

  const clearInput = () => {
    setUserEmail('');
    setUserPassword('');
  };

  const clearErrors = () => {
    setUserEmailError('');
    setUserPasswordError('');
  };

  //  test@gmail.com
  //  helloworld

  //  dan@dan.com
  //  helloworld

  //  TheWeeknd
  //  theweeknd@weeknd.com
  const handleSignIn = (e) => {
    clearErrors();
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword).catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setUserEmailError(error.message);
          break;
        case 'auth/wrong-password':
          setUserPasswordError(error.message);
          break;
      }
    });
  };

  // const updateUsername = () => {};
  const handleSignUp = (e) => {
    clearErrors();

    e.preventDefault();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((authUser) => {
        return setDoc(doc(collection(db, 'users'), authUser.user.uid), {
          username: username,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setUserEmailError(error.message);
            break;
          case 'auth/weak-password':
            setUserPasswordError(error.message);
            break;
        }
      });
    // updateUsername();
  };

  // console.log(auth.currentUser.);

  const handleLogout = () => {
    signOut(auth);
    setCurrentUser('');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        clearInput();
        //  user signs in
        // console.log(authUser);
        setUser(authUser);

        setCurrentUser(authUser.uid);
      } else {
        setUser(null);
        //  User signs out out
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [clients, setClients] = useState([]);

  const [currentClient, setCurrentClient] = useState('');

  useEffect(() => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
      setUserList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
          // firstName: doc.data().eval.firstName,
          // lastName: doc.data().eval.lastName,
        }))
      );
    });
  }, []);

  const addWorkout = (e) => {
    e.preventDefault();
    // const clientRef = doc(db, `clients/${currentClient}`);
    console.log(currentClient);
    let workoutCounter;
    if (currentUser && currentClient) {
      const workoutsRef = collection(
        db,
        `users/${currentUser}/clients/${currentClient}/workouts`
      );

      //  adding doc with named id
      setDoc(doc(workoutsRef, `workout-name`), {
        workoutName: 'Gains',
        exercise: 'Pull Up',
        timestamp: serverTimestamp(),
        // workoutNumber: workoutCounter + 1,
      });
      // console.log(serverTimestamp);
    }

    // //  adding doc with auto id
    // addDoc(workoutsRef, {
    //   workoutName: 'Patellar ',
    //   exercise: 'Deadlift',
    // });
  };
  return (
    <div className="App">
      {user ? (
        <Header handleLogout={handleLogout} currentUser={currentUser} />
      ) : (
        <Login
          email={userEmail}
          setEmail={setUserEmail}
          password={userPassword}
          setPassword={setUserPassword}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={userEmailError}
          passwordError={userPasswordError}
          username={username}
          setUsername={setUsername}
        />
      )}
      <Dashboard currentUser={currentUser} />

      <form action="">
        <button onClick={addWorkout}>add workout</button>
      </form>
    </div>
  );
}

export default App;

//  Planning the app
//  1.  Deciding how to structure the firebase database, considerations:
//    - document file size
//    - standardized collection/document names for queries
//    - admin based or client based?
//    - firebase modular sdk?

//  2.  Connecting firebase auth to firebase firestore
//    - userid shared between modules

//  3.  Creating new clients under each user
//    - determining path in db
//    - naming convention for each client

//  4.  Creating new workouts under each client
//    - autoID vs custom ID
//    - utilizing timestamps
//    - structure of workouts: new subcollection for each workout or nested documents?

//  5.  Getting and changing client information

//  6.  conditionally render client information based on current user
//    - pairing the current user with the information displayed

//  7.  establish routing for navigation between users, clients, and client workouts
//    - determining the app layout

// clients.map(({ id, client }) => {
//   console.log('id: ' + id, client.eval);
// });

// const [trainers, setTrainers] = useState([]);
// const [trainer, setTrainer] = useState({});
// const [exercises, setExercises] = useState([]);
// const [workouts, setWorkouts] = useState([]);
// useEffect(() => {
//   onSnapshot(collection(db, 'trainers'), (snapshot) => {
//     setTrainers(
//       snapshot.docs.map((doc) => ({ id: doc.id, trainer: doc.data() }))
//     );
//   });
// }, []);

// // console.log(trainers);
// // print out list of exercises from database

// const trainersListRef = collection(db, 'trainers');
// const trainerRef = doc(db, 'trainers/trainer1');
// const clientRef = doc(db, 'trainers/trainer1/clients/client1');
// const workoutsRef = collection(
//   db,
//   'trainers/trainer1/clients/client1/workouts'
// );
// const workoutRef = doc(
//   db,
//   'trainers/trainer1/clients/client1/workouts/workout1'
// );

// useEffect(() => {
//   onSnapshot(
//     collection(db, 'trainers/trainer1/clients/client1/workouts'),
//     (snapshot) => {
//       // setWorkouts(snapshot.docs.map((doc) => ({ workouts: doc.data() })));
//       setWorkouts(snapshot.docs.map((doc) => doc.data()));
//     }
//   );
// }, []);

// console.log(workouts);

// workouts.map((workout) => {
//   console.log(workout.exercises[0]);
// });

// const helper = async () => {
//   const trainerSnap = await getDoc(trainerRef);
//   const workoutSnap = await getDoc(workoutRef);

//   console.log(trainerSnap.data());

//   const exercise1 = workoutSnap.data().exercises.exercise1;

//   console.log(workoutSnap.data().exercises.exercise1);
//   console.log(exercise1);
// };
// helper();

// trainers.map(({ username }) => {
//   console.log(username);
// });
