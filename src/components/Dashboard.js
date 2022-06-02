import React, { useState, useEffect } from 'react';
import {
  setDoc,
  collection,
  onSnapshot,
  getDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import './Dashboard.css';
import AddClient from './AddClient';
import WorkoutList from './WorkoutList';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,

// } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
// import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotesIcon from '@mui/icons-material/Notes';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { async } from '@firebase/util';

const Dashboard = ({ currentUser, handleLogout }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentClient, setCurrentClient] = useState('');
  const [dx, setDx] = useState('');
  const [clientName, setClientName] = useState('');
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

  if (currentClient) {
    const getName = async () => {
      const docRef = doc(db, `users/${currentUser}/clients/${currentClient}`);
      const docSnap = await getDoc(docRef);
      // const clientRef = await getDoc(collection(db, `users/${currentUser}/clients/${currentClient}`))

      if (docSnap.exists()) {
        setClientName(docSnap.data().firstName + ' ' + docSnap.data().lastName);
      }
    };
    getName();
  }
  // if(currentClient) {

  //   useEffect(
  //     () =>
  //       onSnapshot(
  //         query(
  //           doc(
  //             db,
  //             `users/${currentUser}/clients/${currentClient}`
  //           ),
  //           orderBy('timestamp', 'desc')
  //         ),
  //         (snapshot) => {
  //           //  everytime the value in the backend changes, it updates the react state with the latest docs
  //           setWorkouts(snapshot.docs);
  //         }
  //       ),
  //     [db]
  //   )
  // }
  // useEffect(() => {
  //   if (currentUser) {
  //     onSnapshot(collection(db, `users/${currentUser}/clients`), (snapshot) => {
  //       setClients(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           client: doc.data(),
  //           // firstName: doc.data().eval.firstName,
  //           // lastName: doc.data().eval.lastName,
  //         }))
  //       );
  //     });
  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      // console.log(match);
      onSnapshot(
        query(
          collection(db, `users/${currentUser}/clients`),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setClients(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              client: doc.data(),
              // firstName: doc.data().eval.firstName,
              // lastName: doc.data().eval.lastName,
            }))
          );
        }
      );
    }
  }, [currentUser]);
  //  creates a new client with the path clients/newID
  const addClient = (e) => {
    e.preventDefault();
    // const clientListRef = collection(db, 'clients');
    const clientListRef = collection(db, `users/${currentUser}/clients`);
    let newFirstName = firstName.toLowerCase();
    let newLastName = lastName.toLowerCase();
    let newID = `${newFirstName}_${newLastName}`;

    // let themeNumber = getRandomNum();

    setDoc(doc(clientListRef, newID), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dx: dx,
      timestamp: serverTimestamp(),
      // color: colorList[themeNumber].color,
      // bgColor: colorList[themeNumber].bgColor,
    });

    //  adds client with auto id
    // addDoc(clientListRef, {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    // });
    setEmail('');
    setFirstName('');
    setLastName('');
    setDx('');
    setOpenModal(false);
  };

  // let match = useRouteMatch();
  // console.log(match);
  // console.log(currentClient);
  return (
    <div className="dashboard">
      <header>
        <h1>{!currentClient ? 'Clients' : clientName}</h1>
        <button className="btn__addClient" onClick={handleLogout}>
          Sign Out
        </button>
      </header>
      {openModal && (
        <AddClient
          closeModal={setOpenModal}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          dx={dx}
          setDx={setDx}
          addClient={addClient}
        />
      )}

      {!currentClient ? (
        clients.length ? (
          <div>
            <ul className="clients__container">
              <div className="client__searchContainer">
                <input
                  className="client__search"
                  type="text"
                  placeholder="Search clients..."
                />
                <button
                  className="btn__addClient"
                  onClick={() => setOpenModal(true)}
                >
                  <AddIcon fontSize="small" />
                  <span>Add Client</span>
                </button>
              </div>
              {/* <h2>Select a client to create a workout.</h2> */}
              {clients.map(({ id, client }) => (
                <li
                  key={id}
                  className={`client__item client__item${id}`}
                  onClick={(e) => setCurrentClient(id)}
                >
                  <div
                    onClick={(e) => setCurrentClient(id)}
                    className={`client__itemContainer client__${id}`}
                  >
                    <div className="client__itemTop">
                      <div className="client__itemTitle">
                        <div className="client__avatar">
                          <p className="client__initials">
                            {client.firstName[0]}
                            {client.lastName[0]}
                          </p>
                        </div>
                        <h2 className="client__name">
                          {client.firstName + ' ' + client.lastName}
                        </h2>
                      </div>
                      <div className="client__options">
                        {/* <MoreVertIcon /> */}
                        <ChevronRightIcon />
                      </div>
                    </div>
                    <div className="client__itemBottom">
                      <div className="client__dx">
                        <p className="dx__title">Diagnosis</p>
                        <p className="dx__name">{client.dx}</p>
                      </div>
                      <div className="client__sessions">
                        <p className="session__title">Last Session</p>
                        <p className="session__num">March 5, 2022</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="">
            <div className="noClient__container">
              <h2>Start creating workouts by adding a client.</h2>
              <button
                className="btn__addClient"
                onClick={() => setOpenModal(true)}
              >
                <AddIcon fontSize="small" />
                <span>Add Client</span>
              </button>
            </div>

            <p className="noClient__overview">
              This is your dashboard. Here, you're able to view a full list of
              your client's, as well a brief overview of each.
            </p>

            {/* <p>
              If you signed in anonymously, and would like to create a real
              account, click here to start.
            </p> */}
          </div>
        )
      ) : (
        // <div>Exercise List</div>
        <WorkoutList
          currentClient={currentClient}
          setCurrentClient={setCurrentClient}
          currentUser={currentUser}
        />
      )}
      {/* {clients ? (
        <div>
          <ul>
            {clients.map(({ id, client }) => (
              <li
                key={id}
                className={`client__item client__item${id}`}
                // onClick={(e) => setCurrentClient(id)}
              >
                <div
                  onClick={(e) => setCurrentClient(id)}
                  className={`client__itemContainer client__${id}`}
                >
                  <div className="client__itemTop">
                    <div className="client__itemTitle">
                      <div className="client__avatar">
                        <p className="client__initials">
                          {client.firstName[0]}
                          {client.lastName[0]}
                        </p>
                      </div>
                      <h2 className="client__name">
                        {client.firstName + ' ' + client.lastName}
                      </h2>
                    </div>
                    <div className="client__options">
                      <MoreVertIcon />
                    </div>
                  </div>
                  <div className="client__itemBottom">
                    <div className="client__dx">
                      <p className="dx__title">Diagnosis</p>
                      <p className="dx__name">{client.dx}</p>
                    </div>
                    <div className="client__sessions">
                      <p className="session__title">Last Session</p>
                      <p className="session__num">March 5, 2022</p>
                    </div>
                  </div>
                </div>
            
              </li>
            ))}
          </ul>
         
        </div>
      ) : (
        <WorkoutList
        // firstName={firstName}

        // lastName={lastName}
        // setLastName={setLastName}
        // email={email}
        // setEmail={setEmail}
        // dx={dx}
        // setDx={setDx}
        // addClient={addClient}
        />
      )} */}
      {/* 
      <WorkoutList
        setCurrentClient={setCurrentClient}
        currentClient={currentClient}
        // firstName={firstName}

        // lastName={lastName}
        // setLastName={setLastName}
        // email={email}
        // setEmail={setEmail}
        // dx={dx}
        // setDx={setDx}
        // addClient={addClient}
      /> */}
    </div>
  );
};

export default Dashboard;

//  #CCCCFF / #7575ff

//  #ADD8E6 / #509ab3

//  #96DED1
//  #9FE2BF
//  #DAA06D
//  #E97451
//  #C2B280
//  #F2D2BD
//  #C2B280
//  #B2BEB5
//  #FFD580
//  #FFE5B4

// {/* <div>
//   <ul>
//     {clients.map(({ id, client }) => (
//       <li className="client__item" onClick={(e) => setCurrentClient(id)}>
//         <div className="client__itemContainer">
//           <div className="client__itemTop">
//             <div className="client__itemTitle">
//               <div className="client__avatar">
//                 <p className="client__initials">
//                   {client.firstName[0]}
//                   {client.lastName[0]}
//                 </p>
//               </div>
//               <h2 className="client__name">
//                 {client.firstName + ' ' + client.lastName}
//               </h2>
//             </div>
//             <div className="client__options">
//               <h6>-</h6>
//             </div>
//           </div>
//           <div className="client__itemBottom">
//             <div className="client__dx">
//               <p className="dx__title">Diagnosis</p>
//               <p className="dx__name">{client.dx}</p>
//             </div>
//             <div className="client__sessions">
//               <p className="session__title">Last Session</p>
//               <p className="session__num">Oct 5, 2021</p>
//             </div>
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
//   {/* {clients.map(({ id, client }) => (
//     <div onClick={(e) => setCurrentClient(id)}>
//       <button>
//         {client.firstName} {client.lastName}
//       </button>

//     </div>
//   ))}
// </div> */}

// const colorList = [
//   {
//     bgColor: 'CCCCFF',
//     color: '7575ff',
//   },
//   {
//     bgColor: 'ADD8E6',
//     color: '509ab3',
//   },
//   {
//     bgColor: '96DED1',
//     color: '37b19a',
//   },
//   {
//     bgColor: '9FE2BF',
//     color: '3cac72',
//   },
//   {
//     bgColor: 'DAA06D',
//     color: '7a4414',
//   },
//   {
//     bgColor: 'e9947a',
//     color: 'af3a16',
//   },
//   {
//     bgColor: 'C2B280',
//     color: '6d5716',
//   },
// ];

// const getRandomNum = () => {
//   let randomNum = Math.floor(Math.random() * colorList.length);
//   return randomNum;
// };
