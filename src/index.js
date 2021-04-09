import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { I18Provider } from './i18n'
import Login from './components/Login';

//TODO: Accesibilidad vamos bien
//TODO: responsividad
//TODO: hacer las redirecciones a los subdominios
//TODO: montar en webflow

ReactDOM.render(
  <Auth0Provider
    clientId={process.env.REACT_APP_CLIENT_ID}
    domain={process.env.REACT_APP_DOMAIN}
    redirectUri={window.location.origin}
    audience={"https://auth0-back"}
  >
    <React.StrictMode>
      <I18Provider>
        <Login />
      </I18Provider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
