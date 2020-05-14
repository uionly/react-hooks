import React, { useState } from 'react';

import UserPicker from './components/UserPicker';
import User from './components/User';

const App = ()=> {
 const [state,setState] =  useState({
    selectedUser: 1,
    side: 'light',
    destroyed: false
  },[]);

  const sideHandler = side => {
   setState({ ...state, side: side });
  };

  const userSelectHandler = event => {
    const userId = event.target.value;
    setState({  ...state, selectedUser: userId });
  };

  const destructionHandler = () => {
   setState({  ...state, destroyed: true });
  };

 
    let content = (
      <React.Fragment>
        <UserPicker
          side={state.side}
          selectedUser={state.selectedUser}
          onUserSelect={userSelectHandler}
        />
        <User selectedUser={state.selectedUser} />
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {state.side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (state.destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;

}

export default App;
