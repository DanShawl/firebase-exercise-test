import React, { useState, useEffect } from 'react';
import {
  setDoc,
  collection,
  onSnapshot,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const Header = ({ handleLogout, currentUser }) => {
  // console.log(currentUser);

  const [clients, setClients] = useState([]);
  // const [client, setClient] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <section className="header">
        <nav>
          {/* <h2>Current Clients</h2> */}
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </section>
      <div className="client__list"></div>
      {/* <form action="">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addClient}
          disabled={!firstName || !lastName || !email}
        >
          Add Client
        </button>
      </form> */}
    </div>
  );
};

export default Header;

// useEffect(() => {
//   const colRef = collection(db, 'users');
//   console.log(colRef);
//   const userRef = doc(colRef, `${currentUser}`);
//   console.log(userRef);
// }, []);

// const addClient = (e) => {
//   e.preventDefault();
//   const clientListRef = collection(db, `users/${currentUser}/clients`);

//   let newFirstName = firstName.toLowerCase();
//   let newLastName = lastName.toLowerCase();
//   let newID = `${newFirstName}_${newLastName}`;

//   setDoc(doc(clientListRef, newID), {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//   });
// };
// const [currentClient, setCurrentClient] = useState('');

// useEffect(() => {
//   onSnapshot(collection(db, `users/${currentUser}/clients`), (snapshot) => {
//     setClients(
//       snapshot.docs.map((doc) => ({
//         id: doc.id,
//         client: doc.data(),
//         // firstName: doc.data().eval.firstName,
//         // lastName: doc.data().eval.lastName,
//       }))
//     );
//   });
// }, []);

// //  creates a new client with the path clients/newID
// const addClient = (e) => {
//   e.preventDefault();
//   const clientListRef = collection(db, `users/${currentUser}/clients`);

//   let newFirstName = firstName.toLowerCase();
//   let newLastName = lastName.toLowerCase();
//   let newID = `${newFirstName}_${newLastName}`;

//   setDoc(doc(clientListRef, newID), {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//   });
