import React, { Component } from 'react';

import './UserPicker.css';
// data": {
//   "id": 2,
//   "email": "janet.weaver@reqres.in",
//   "first_name": "Janet",
//   "last_name": "Weaver",
//   "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
// }

class UserPicker extends Component {
  state = { users: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://reqres.in/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(user => {
        let userData = user.data;
        this.setState({
          users: userData,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let content = <p>Loading users...</p>;
    
    if (
      !this.state.isLoading &&
      this.state.users &&
      this.state.users.length > 0
    ) {
      content = (
        <select
          onChange={this.props.onUserSelect}
          value={this.props.selectedUser}
          className={this.props.side}
        >
          {this.state.users.map(user => (
            <option key={user.id} value={user.id}>
              {user.first_name}
            </option>
          ))}
        </select>
      );
    } else if (
      !this.state.isLoading &&
      (!this.state.users || this.state.users.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  }
}

export default UserPicker;
