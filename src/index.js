import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Login from './components/Login';

//TODO: Animaciones
//TODO: Jalar tipo de usuario para esconder settings
//TODO: Accesibilidad
//TODO: poder arrastrar los widgets de las apps
//TODO: revisar chargebee para consultar servicios pagados
//TODO: footer del dropdown
//TODO: responsividad
//TODO: hacer las redirecciones a los subdominios
//TODO: montar en webflow

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
