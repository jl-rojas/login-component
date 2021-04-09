import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { I18Provider } from './i18n'
import Login from './components/Login';

//TODO: Accesibilidad vamos bien
//TODO: responsividad
//TODO: hacer las redirecciones a los subdominios
//TODO: montar en webflow

class App extends React.Component {
  render() {
    return (
      <div>This is a React component inside of Webflow!</div>
    )
  }
}

console.log(document.getElementById('react-target'))

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('react-target')
);
// ReactDOM.render(
//   <Auth0Provider
//     clientId={'rFcH0GCVauXHvZ6Fa9LL7D0k8ujj9X7m'}
//     domain={'viaducto-jl-rojas.us.auth0.com'}
//     redirectUri={window.location.origin}
//   >
//     <React.StrictMode>
//       <I18Provider>
//         <Login />
//       </I18Provider>
//     </React.StrictMode>
//   </Auth0Provider>,
//   document.getElementById('react-target')
// );
