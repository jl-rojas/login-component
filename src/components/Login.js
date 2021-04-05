import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { LoginButton, RegisterButton } from './Buttons'
import { Heading, Paragraph, VR } from './Buttons/StyledButton';
import Dropdown from './Dropdown';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user } = useAuth0();

  const handleRegister = () => { loginWithRedirect({ screen_hint: 'signup' }); }

  return isLoading ? <h1>Loading...</h1> :
    !isAuthenticated ?
      (
        <Heading>
          <Paragraph>Navigation Link</Paragraph>
          <VR />
          <LoginButton callback={loginWithRedirect} />
          <RegisterButton callback={handleRegister} />
        </Heading>
      )
      :
      (
        <Heading>
          <Paragraph>Navigation Link</Paragraph>
          <VR />
          <Dropdown logout={logout} user={user} />
        </Heading>
      )
}

export default Login
