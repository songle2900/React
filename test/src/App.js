import React, { useState } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput'
import UserInput from './UserInput/UserInput'

const App = () => {
  const [ userName, setUserName ] = useState({
    username: 'Eric' 
  });

  const nameChangehandler = (e) => {
    setUserName({
      username: e.target.value
    });
  };

  return (
    <div>
      <UserInput changed={nameChangehandler} value={userName.username} />
      <UserOutput name={userName.username} />
      <UserOutput name={userName.username} />
      <UserOutput name="Carol" />
    </div>
  );
};

export default App;
