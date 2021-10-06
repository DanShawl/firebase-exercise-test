import React, { useState } from 'react';
import './AddClient.css';

const AddClient = ({
  closeModal,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  addClient,
}) => {
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="close__btn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <h2>Add Client</h2>
        <form action="">
          <div className="client__info">
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
          </div>
          <div className="client__notes">
            <p>diagnosis</p>
            <p>eval notes</p>
          </div>
          <div className="modal__btns">
            <button onClick={() => closeModal(false)}>Cancel</button>
            <button
              onClick={addClient}
              disabled={!firstName || !lastName || !email}
            >
              Add Client
            </button>
          </div>
        </form>
      </div>

      {/*  */}
    </div>
  );
};

export default AddClient;
