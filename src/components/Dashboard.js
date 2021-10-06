import React, { useState, useEffect } from 'react';
import {
  setDoc,
  collection,
  onSnapshot,
  doc,
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

  useEffect(() => {
    if (currentUser) {
      onSnapshot(collection(db, `users/${currentUser}/clients`), (snapshot) => {
        setClients(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            client: doc.data(),
            // firstName: doc.data().eval.firstName,
            // lastName: doc.data().eval.lastName,
          }))
        );
      });
    }
  }, [currentUser]);
  console.log(clients);

  //  creates a new client with the path clients/newID
  const addClient = (e) => {
    e.preventDefault();
    // const clientListRef = collection(db, 'clients');
    const clientListRef = collection(db, `users/${currentUser}/clients`);
    let newFirstName = firstName.toLowerCase();
    let newLastName = lastName.toLowerCase();
    let newID = `${newFirstName}_${newLastName}`;

    setDoc(doc(clientListRef, newID), {
      firstName: firstName,
      lastName: lastName,
      email: email,
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
  };

  return (
    <div>
      <header>
        <h1>Current Clients</h1>
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
          addClient={addClient}
        />
      )}

      <div>
        <ul>
          {clients.map(({ id, client }) => (
            <li onClick={(e) => setCurrentClient(id)}>
              <button>
                {client.firstName} {client.lastName}
              </button>
              {/* <h3>
              {client.firstName} {client.lastName}
            </h3> */}
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
