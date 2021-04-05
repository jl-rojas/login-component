import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Login from './components/Login';

ReactDOM.render(
  <Auth0Provider
    clientId={process.env.REACT_APP_CLIENT_ID}
    domain={process.env.REACT_APP_DOMAIN}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Login />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
