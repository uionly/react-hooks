import React, { useEffect, useState } from "react";

import Summary from "./Summary";

const User = (props) => {
  const [state, setState] = useState({ loadedUser: {}, isLoading: false });
  useEffect(() => {
    fetchData();
    return ()=>{
      console.log("to0 soon !");
    }
  }, [props.selectedUser]);

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedUser
    );
    setState({ ...state, isLoading: true });
    fetch("https://reqres.in/api/users/" + props.selectedUser)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then((user) => {
        let userData = user.data;
        const loadedUser = {
          id: props.selectedUser,
          name: userData.first_name,
          email: userData.email,
          avatar: userData.avatar,
        };
        setState({ ...state, loadedUser: loadedUser, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  let content = <p>Loading User...</p>;

  if (!state.isLoading && state.loadedUser.id) {
    content = (
      <Summary
        name={state.loadedUser.name}
        id={state.loadedUser.id}
        email={state.loadedUser.email}
        avatar={state.loadedUser.avatar}
      />
    );
  } else if (!state.isLoading && !state.loadedUser.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(User);
