import React, { useState } from "react";
import UserPicker from "./components/UserPicker";
import User from "./components/User";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(1);
  const [theme, setTheme] = useState("light");
  const [destroyed, setDestroyed] = useState(false);
  const themeHandler = (theme) => {
    setTheme(theme);
  };
  const userSelectHandler = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
  };
  const destructionHandler = () => {
    setDestroyed(true);
  };
  let content = (
    <React.Fragment>
      <UserPicker
        theme={theme}
        selectedUser={selectedUser}
        onUserSelect={userSelectHandler}
      />
      <User selectedUser={selectedUser} />
      <button onClick={themeHandler.bind(this, "light")}>Light Theme</button>
      <button onClick={themeHandler.bind(this, "dark")}>Dark Theme</button>
      {theme === "dark" && (
        <button onClick={destructionHandler}> Destroy </button>
      )}
    </React.Fragment>
  );
  if (destroyed) {
    content = <h1> Killed them all!</h1>;
  }
  return content;
};

export default App;
