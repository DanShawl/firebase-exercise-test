// import React, { useState } from 'react';
// import './AddClient.css';
// import CloseIcon from '@mui/icons-material/Close';

// const AddWorkout = ({
//   closeModal,
//   firstName,
//   setFirstName,
//   lastName,
//   setLastName,
//   email,
//   setEmail,
//   addClient,
//   dx,
//   setDx,
// }) => {
//   return (
//     <div className="modal__background">
//       <div className="modal__container">
//         <div className="modal__header">
//           <h2>Add Workout</h2>
//           <button className="close__btn" onClick={() => closeModal(false)}>
//             <CloseIcon />
//           </button>
//         </div>
//         <form action="">
//           <div className="client__info">
//             {/* <div className="client__names"> */}
//             <input
//               type="text"
//               placeholder="Exercise Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder=""
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//             {/* </div> */}
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Diagnosis"
//               value={dx}
//               onChange={(e) => setDx(e.target.value)}
//             />
//           </div>
//           <div className="client__notes">
//             {/* <input
//               type="text"
//               placeholder="Diagnosis"
//               value={dx}
//               onChange={(e) => setDx(e.target.value)}
//             /> */}
//           </div>
//           <div className="modal__btns">
//             <button
//               className="add__btn"
//               onClick={addClient}
//               disabled={!firstName || !lastName || !email}
//             >
//               Add Workout
//             </button>
//             {/* <button className="cancel__btn" onClick={() => closeModal(false)}>
//               Cancel
//             </button> */}
//           </div>
//         </form>
//       </div>

//       {/*  */}
//     </div>
//   );
// };

// export default AddWorkout;
