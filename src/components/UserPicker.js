import React, { useState, useEffect } from "react";

import "./UserPicker.css";
const UserPicker = (props) => {
  const [state, setState] = useState({ users: [], isLoading: false });
  useEffect(() => {
    setState({ ...state, isLoading: true });
    fetch("https://reqres.in/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((user) => {
        let userData = user.data;
        setState({ ...state, users: userData, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log("cleaning up");
    };
  }, []);

  let content = <p>Loading users...</p>;

  if (!state.isLoading && state.users && state.users.length > 0) {
    content = (
      <select
        onChange={props.onUserSelect}
        value={props.selectedUser}
        className={props.side}
      >
        {state.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name}
          </option>
        ))}
      </select>
    );
  } else if (!state.isLoading && (!state.users || state.users.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default UserPicker;
