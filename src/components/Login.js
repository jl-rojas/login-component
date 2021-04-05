import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { LoginButton, LogoutButton, RegisterButton } from './Buttons'
import Dropdown from './Dropdown';
const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const handleRegister = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  }

  return isLoading ? <h1>Loading...</h1> :
    !isAuthenticated ?
      (
        <div>
          <LoginButton callback={loginWithRedirect} />
          <RegisterButton callback={handleRegister} />
        </div>
      )
      :
      (
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <LogoutButton callback={logout} />
          <Dropdown />
        </div>
      )
}

export default Login
