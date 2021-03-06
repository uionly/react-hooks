import React from 'react';

import './Summary.css';

const Summary = props => {
  return (
    <div className="summary">
      <h1>{props.name}</h1>
      <div><img alt ="noting" src={props.avatar}/></div>
      <p>
       Email: <span className="summary__output">{props.email}</span>
      </p>
      
    </div>
  );
};

export default Summary;
