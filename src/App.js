import React, { Component } from 'react';

import UserPicker from './components/UserPicker';
import User from './components/User';

class App extends Component {
  state = {
    selectedUser: 1,
    side: 'light',
    destroyed: false
  };

  sideHandler = side => {
    this.setState({ side: side });
  };

 userSelectHandler = event => {
    const userId = event.target.value;
    this.setState({ selectedUser: userId });
  };

  destructionHandler = () => {
    this.setState({ destroyed: true });
  };

  render() {
    let content = (
      <React.Fragment>
        <UserPicker
          side={this.state.side}
          selectedUser={this.state.selectedUser}
          onUserSelect={this.userSelectHandler}
        />
        <User selectedUser={this.state.selectedUser} />
        <button onClick={this.sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={this.sideHandler.bind(this, 'dark')}>Dark Side</button>
        {this.state.side === 'dark' && (
          <button onClick={this.destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (this.state.destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
  }
}

export default App;
