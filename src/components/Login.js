import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Spacer, Paragraph } from '@jp-olvera/jp-viaducto-components';

import { LoginButton, RegisterButton } from './Buttons'
import { Heading, VR } from './Buttons/StyledButton';
import Dropdown from './Dropdown';


const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [info, setInfo] = useState(null);
  const handleRegister = () => { loginWithRedirect({ screen_hint: 'signup' }); }
  const subs = (sub, token) =>
    axios({
      method: 'get',
      url: `https://nest-hnkuf.ondigitalocean.app/customer/subs`,
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
      url: `https://nest-hnkuf.ondigitalocean.app/customer/invoices/${sub}`,
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
