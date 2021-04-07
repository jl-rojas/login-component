import React from "react";
import { FormattedMessage } from 'react-intl';
import { Button } from '@jp-olvera/jp-viaducto-components'
import Logout from './logout.svg'

const LogoutButton = ({ callback }) => {
  let colors = {
    default: "transparent",
    click: "transparent",
    hover: "transparent",
  };
  let SVG = () => <img src={Logout} alt="" />;
  return (
    <Button
      label={<FormattedMessage id="buttonLogout" />}
      icon={<SVG />}
      alt=""
      onClick={callback}
      size="small"
      colors={colors}
    />
  );
};

export default LogoutButton;
