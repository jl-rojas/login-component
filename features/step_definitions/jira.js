const assert = require('assert');
const { Given, Then } = require('@cucumber/cucumber');

Given('We are developers', () => {
  assert(1, 1);
})
Then('We are developers', () => {
  assert(1, 1);
})
