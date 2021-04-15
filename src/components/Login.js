import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Spacer } from '@jp-olvera/jp-viaducto-components';

import { LoginButton, RegisterButton } from './Buttons'
import Dropdown from './Dropdown';


const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [info, setInfo] = useState(null);
  const handleRegister = () => { loginWithRedirect({ screen_hint: 'signup' }); }
  const subs = (sub, token) =>
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/customer/subs`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        customer_id: sub
      }
    });

  const invoice = (sub, subscription_id, token) =>
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/customer/invoices/${sub}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        subscription_id: subscription_id
      }
    });

  useEffect(() => {
    const chargeBee = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        subs(user.sub, token)
          .then(({ data }) => {
            invoice(user.sub, data.subscriptions[0].subscription.id, token)
              .then(resp => {
                setInfo({
                  subscription: data,
                  invoices: resp.data
                });
              }).then(er => {
                // console.log(er);
                setInfo(null);
              })
          })
          .catch(error => {
            // console.log(error);
            setInfo(null);
          })
      }
    };
    chargeBee();
  }, [isAuthenticated, user, getAccessTokenSilently])
  return isLoading ? null :
    !isAuthenticated ?
      (
        <>
          <LoginButton callback={loginWithRedirect} />
          <Spacer direction="horizontal" size="md" />
          <RegisterButton callback={handleRegister} />
          <Spacer direction="horizontal" size="md" />
        </>
      )
      :
      (
        <>
          <Dropdown logout={logout} user={user} info={info} />
          <Spacer direction="horizontal" size="md" />
        </>
      )
}

export default Login
