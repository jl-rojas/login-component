const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function getUi(status) {
  if (status === 'activa') {
    return 'dropdown';
  }
  return 'login component';
}

Given('el usuario tiene cuenta con una sesión {string}', function (status) {
  this.status = status;
});

When('visita el sitio web', function () {});

Then('el sitio web muestra {string}', (expectedAnswer) => {
  assert(getUi(this.status), expectedAnswer);
});

Given('soy una persona nueva en la plataforma', function () {});

When('ingreso al sitio web', function () {});

Then('mostrar login component', () => {});
