const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function getDisabledApps(product) {
  if (product === 'zendesk') {
    return 'zendesk';
  }
  return 'all';
}

function getApps(plan) {
  if (plan === 'Free') {
    return 'discourse';
  }
  return 'all';
}

Given('no he pagado {string}', function (product) {
  this.product = product;
});

When('abro el dropdown para ver mis aplicaciones', function () {});

Then('las aplicaciones {string} están deshabilitadas', (expectedAnswer) => {
  assert(getDisabledApps(this.product), expectedAnswer);
});

Given('I have a {string} subscription', function (plan) {
  this.plan = plan;
});

When('I open the dropdown to see my apps list', function () {});

Then('I should see {string}', (expectedAnswer) => {
  assert(getApps(this.plan), expectedAnswer);
});
