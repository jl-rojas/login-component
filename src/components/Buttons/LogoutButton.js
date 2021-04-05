import React from "react";

const LogoutButton = ({ callback }) => {
  return <button onClick={callback}>Log out</button>;
};

export default LogoutButton;
