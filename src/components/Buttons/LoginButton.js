import React from "react";
import { Button } from '@jp-olvera/jp-viaducto-components'
import { FormattedMessage } from 'react-intl';

const LoginButton = ({ callback }) => {
  let colors = {
    default: "transparent",
    hover: "transparent",
    click: "transparent"
  }
  return <Button onClick={callback} colors={colors} label={<FormattedMessage id="buttonLogin" />} />;
}

export default LoginButton;
