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
  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const handleRegister = () => { loginWithRedirect({ screen_hint: 'signup' }); }
  const subs = (sub) =>
    axios({
      method: 'get',
      url: `http://localhost:7000/customer/subs`,
      params: {
        customer_id: sub
      }
    });

  const invoice = (sub, subscription_id) =>
    axios({
      method: 'get',
      url: `http://localhost:7000/customer/invoices/${sub}`,
      params: {
        subscription_id: subscription_id
      }
    });

  useEffect(() => {
    const chargeBee = async () => {
      if (isAuthenticated) {
        subs(user.sub)
          .then(({ data }) => {
            setInfo(data);
            console.log(data.subscriptions[0].subscription.id);
            invoice(user.sub, data.subscriptions[0].subscription.id)
              .then(resp => {
                console.log(resp.data);
                setInvoiceInfo(resp.data)
              })
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
