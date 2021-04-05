import React from "react";

import { StyledLogout, Span } from './StyledButton';
import Logout from './logout.svg'

const LogoutButton = ({ callback }) => {
  return (
    <StyledLogout onClick={callback}>
      Log out
      <Span>
        <img src={Logout} alt="" />
      </Span>
    </StyledLogout>
  );
};

export default LogoutButton;
