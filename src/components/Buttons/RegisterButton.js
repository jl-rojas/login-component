import React from "react";
import { FormattedMessage } from 'react-intl';
import { Button, Spacer } from '@jp-olvera/jp-viaducto-components';

// import { StyledRegister } from './StyledButton';

const RegisterButton = ({ callback }) => {
  let colors = {
    default: "#1665D8",
    hover: "",
    click: "",
    text: "#fff"
  }
  return (
    <>
      <Button onClick={callback} label={<FormattedMessage id="buttonCreateAnAccount" />} colors={colors} />
      <Spacer size="sm" direction="horizontal" />
    </>
  )
};

export default RegisterButton;
