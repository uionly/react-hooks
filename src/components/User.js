import React from "react";
import { useHttp } from "../hooks/http";

import Summary from "./Summary";

const User = (props) => {
  let url = "https://reqres.in/api/users/" + props.selectedUser;
  const [isLoading, userData] = useHttp(url, [props.selectedUser]);
  const loadedUser = {
    id: props.selectedUser,
    name: userData.first_name,
    email: userData.email,
    avatar: userData.avatar,
  };

  let content = <p>Loading User...</p>;

  if (!isLoading && loadedUser.id) {
    content = (
      <Summary
        name={loadedUser.name}
        id={loadedUser.id}
        email={loadedUser.email}
        avatar={loadedUser.avatar}
      />
    );
  } else if (!isLoading && !loadedUser.id) {
    content = <p>Failed to fetch character.</p>;

  }
  return content;
};

export default React.memo(User);
