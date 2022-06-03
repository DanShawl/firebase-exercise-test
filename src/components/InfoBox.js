import React from 'react';
import './InfoBox.css';

const InfoBox = ({
  infoTitle,
  infoSubTitle,
  infoSubTitle2,
  infoData,
  infoData2,
}) => {
  return (
    <div>
      <div className="info__container">
        <h3>{infoTitle}</h3>
        <div className="info__block">
          <h4>{infoSubTitle}</h4>
          <p>{infoData}</p>
        </div>
        <div className="info__block">
          <h4>{infoSubTitle2}</h4>
          <p>{infoData2}</p>
        </div>
        {/* <button className="btn__addClient">
          <AddIcon fontSize="small" />
          <span>Add Client</span>
        </button> */}
      </div>

      {/* <p>
              If you signed in anonymously, and would like to create a real
              account, click here to start.
            </p> */}
    </div>
  );
};

export default InfoBox;
