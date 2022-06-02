import React, { useState } from 'react';
// import './AddClient.css';
import CloseIcon from '@mui/icons-material/Close';

const InputModal = ({
  inputValue,
  setInputValue,
  setOpenInput,
  modalTitle,
  inputPlaceholder,
  createFunction,
}) => {
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__header">
          <h2>{modalTitle}</h2>
          <button className="close__btn" onClick={() => setOpenInput(false)}>
            <CloseIcon />
          </button>
        </div>
        <form action="">
          <div className="client__info">
            {/* <div className="client__names"> */}
            <input
              type="text"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="modal__btns">
            <button
              className="add__btn"
              onClick={createFunction}
              // disabled={!firstName || !lastName || !email}
            >
              Create Workout
            </button>
            {/* <button className="cancel__btn" onClick={() => closeModal(false)}>
              Cancel
            </button> */}
          </div>
        </form>
      </div>

      {/*  */}
    </div>
  );
};

export default InputModal;
