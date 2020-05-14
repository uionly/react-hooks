import React, { Component } from 'react';

import Summary from './Summary';

class User extends Component {
  state = { loadedUser: {}, isLoading: false };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return (
      nextProps.selectedUser !== this.props.selectedUser ||
      nextState.loadedUser.id !== this.state.loadedUser.id ||
      nextState.isLoading !== this.state.isLoading
    );
  }

  componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.selectedUser !== this.props.selectedUser) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }
// data": {
//   "id": 2,
//   "email": "janet.weaver@reqres.in",
//   "first_name": "Janet",
//   "last_name": "Weaver",
//   "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
// }
  fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        this.props.selectedUser
    );
    this.setState({ isLoading: true });
    fetch('https://reqres.in/api/users/' + this.props.selectedUser)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(user => {
       let  userData = user.data;
        const loadedUser = {
          id: this.props.selectedUser,
          name: userData.first_name,
          email: userData.email,
          avatar: userData.avatar
        };
        this.setState({ loadedUser: loadedUser, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    console.log('Too soon...');
  }

  render() {
    let content = <p>Loading User...</p>;

    if (!this.state.isLoading && this.state.loadedUser.id) {
      content = (
        <Summary
          name={this.state.loadedUser.name}
          id={this.state.loadedUser.id}
          email={this.state.loadedUser.email} avatar ={this.state.loadedUser.avatar}
        />
      );
    } else if (!this.state.isLoading && !this.state.loadedUser.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }
}

export default User;
