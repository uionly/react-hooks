import React, { useState } from "react";

import UserPicker from "./components/UserPicker";
import User from "./components/User";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(1);
  const [side, setSide] = useState("light");
  const [destroyed, setDestroyed] = useState(false);
  const sideHandler = (side) => {
    setSide(side);
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
        side={side}
        selectedUser={selectedUser}
        onUserSelect={userSelectHandler}
      />
      <User selectedUser={selectedUser} />
      <button onClick={sideHandler.bind(this, "light")}>Light Side</button>
      <button onClick={sideHandler.bind(this, "dark")}>Dark Side</button>
      {side === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );
  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
