import React from "react";
import { StyledRegister } from './StyledButton';
const RegisterButton = ({ callback }) => {
  return <StyledRegister onClick={callback}>Create an Account</StyledRegister>;
};

export default RegisterButton;
