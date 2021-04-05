import React from "react";

import { StyledLogin } from './StyledButton';

const LoginButton = ({ callback }) => {
  return <StyledLogin onClick={callback}>Log in</StyledLogin>;
}

export default LoginButton;
