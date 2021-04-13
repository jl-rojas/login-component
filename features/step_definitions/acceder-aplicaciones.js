const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

function getDestination(app) {
  if (app === 'discourse') {
    return 'tk.discourse.com';
  }
  return 'editar perfil';
}
Given('no recuerdo la url de {string}', function (app) {
  this.app = app;
});
When(
  'entro a la sección de {string} en la página de marketing',
  function (section) {}
);

Then('puedo ser redirigido a {string}', function (expectedValue) {
  assert(getDestination(this.app), expectedValue);
});

Given('no recuerdo la url de la sección administrativa', function () {});

When(
  'entro a la sección de configuración de la aplicación en la página de marketing',
  function () {}
);

Then('puedo ser redirigido a quitar acceso', function () {});

Then('eliminar a un usuario despedido de la empresa', function () {});

Given(
  'que soy usuario gestor quiero limitar el acceso a un usuario básico',
  function () {}
);
When(
  'el usuario básico quiera ver la configuración de la organización',
  function () {}
);
Then('se esconde el enlace a la página administrativa', function () {});
