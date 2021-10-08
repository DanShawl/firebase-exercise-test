import React, { useState, useEffect } from 'react';
import {
  setDoc,
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import './Dashboard.css';
import AddClient from './AddClient';

const Dashboard = ({ currentUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentClient, setCurrentClient] = useState('');
  const [dx, setDx] = useState('');

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

  const colorList = [
    {
      bgColor: 'CCCCFF',
      color: '7575ff',
    },
    {
      bgColor: 'ADD8E6',
      color: '509ab3',
    },
    {
      bgColor: '96DED1',
      color: '37b19a',
    },
    {
      bgColor: '9FE2BF',
      color: '3cac72',
    },
    {
      bgColor: 'DAA06D',
      color: '7a4414',
    },
    {
      bgColor: 'e9947a',
      color: 'af3a16',
    },
    {
      bgColor: 'C2B280',
      color: '6d5716',
    },
  ];

  const getRandomNum = () => {
    let randomNum = Math.floor(Math.random() * colorList.length);
    return randomNum;
  };
  // console.log(serverTimestamp());

  //  creates a new client with the path clients/newID
  const addClient = (e) => {
    e.preventDefault();
    // const clientListRef = collection(db, 'clients');
    const clientListRef = collection(db, `users/${currentUser}/clients`);
    let newFirstName = firstName.toLowerCase();
    let newLastName = lastName.toLowerCase();
    let newID = `${newFirstName}_${newLastName}`;

    let themeNumber = getRandomNum();

    setDoc(doc(clientListRef, newID), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dx: dx,
      timestamp: serverTimestamp(),
      color: colorList[themeNumber].color,
      bgColor: colorList[themeNumber].bgColor,
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

  return (
    <div className="dashboard">
      <header>
        <h1>Clients</h1>
        <button className="btn__addClient" onClick={() => setOpenModal(true)}>
          Add Client
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
      {/* ADD A CONDITION TO TELL USER TO ADD CLIENTS IF NONE */}
      <div>
        <ul>
          {clients.map(({ id, client }) => (
            <li className="client__item" onClick={(e) => setCurrentClient(id)}>
              <div className="client__itemContainer">
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
                    <h6>-</h6>
                  </div>
                </div>
                <div className="client__itemBottom">
                  <div className="client__dx">
                    <p className="dx__title">Diagnosis</p>
                    <p className="dx__name">{client.dx}</p>
                  </div>
                  <div className="client__sessions">
                    <p className="session__title">Last Session</p>
                    <p className="session__num">Oct 5, 2021</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* {clients.map(({ id, client }) => (
          <div onClick={(e) => setCurrentClient(id)}>
            <button>
              {client.firstName} {client.lastName}
            </button>
           
          </div>
        ))} */}
      </div>

      {/* Search Clients */}
      {/* Add Clients */}
      {/* Client List */}
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
