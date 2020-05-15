import React, { Component } from "react";

import UserPicker from "./components/UserPicker";
import User from "./components/User";
import "./App.css";
class App extends Component {
  state = {
    selectedUser: 1,
    theme: "light",
    destroyed: false,
  };

  themeHandler = (theme) => {
    this.setState({ theme: theme });
  };

  userSelectHandler = (event) => {
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
          theme={this.state.theme}
          selectedUser={this.state.selectedUser}
          onUserSelect={this.userSelectHandler}
        />
        <User selectedUser={this.state.selectedUser} />

        <button onClick={this.themeHandler.bind(this, "light")}>
          Light Theme
        </button>
        <button onClick={this.themeHandler.bind(this, "dark")}>
          Dark Theme
        </button>
        <button onClick={this.destructionHandler}> Kill! </button>
      </React.Fragment>
    );

    if (this.state.destroyed) {
      content = <h1> I killed Him !</h1>;
    }
    return content;
  }
}

export default App;
