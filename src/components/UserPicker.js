import React from "react";
import { useHttp } from "../hooks/http";
import "./UserPicker.css";
const UserPicker = (props) => {
  const [isLoading, users] = useHttp("https://reqres.in/api/users", []);
  let content = <p>Loading users...</p>;
  if (!isLoading && users && users.length > 0) {
    content = (
      <select
        onChange={props.onUserSelect}
        value={props.selectedUser}
        className={props.theme}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!users || users.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default UserPicker;
