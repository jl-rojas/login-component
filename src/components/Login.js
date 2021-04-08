import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Spacer, Paragraph } from '@jp-olvera/jp-viaducto-components';

import { LoginButton, RegisterButton } from './Buttons'
import { Heading, VR } from './Buttons/StyledButton';
import Dropdown from './Dropdown';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user } = useAuth0();
  const [info, setInfo] = useState(null);
  const handleRegister = () => { loginWithRedirect({ screen_hint: 'signup' }); }

  useEffect(() => {
    const chargeBee = async () => {
      if (isAuthenticated) {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/customer/subs`,
          data: {
            data: {
              filter: {
                customer_id: { is: user.sub }
              }
            }
          }
        })
          .then(({ data }) => {
            console.log(data);
            setInfo(data);
          })
          .catch(error => {
            console.log(error);
            setInfo(null);
          })
      }
    };
    chargeBee();
  }, [isAuthenticated, user])

  return isLoading ? <h1>Loading...</h1> :
    !isAuthenticated ?
      (
        <>
          <Spacer direction="vertical" size="xxl" />
          <Heading>
            <Paragraph size="sm">Navigation Link</Paragraph>
            <Spacer direction="horizontal" size="md" />
            <VR />
            <Spacer direction="horizontal" size="md" />
            <LoginButton callback={loginWithRedirect} />
            <Spacer direction="horizontal" size="md" />
            <RegisterButton callback={handleRegister} />
            <Spacer direction="horizontal" size="md" />
          </Heading>
        </>
      )
      :
      (
        <>
          <Spacer direction="vertical" size="xxl" />
          <Heading>
            <Paragraph size="sm">Navigation Link</Paragraph>
            <Spacer direction="horizontal" size="md" />
            <VR />
            <Spacer direction="horizontal" size="md" />
            <Dropdown logout={logout} user={user} info={info} />
            <Spacer direction="horizontal" size="md" />
          </Heading>
        </>
      )
}

export default Login
