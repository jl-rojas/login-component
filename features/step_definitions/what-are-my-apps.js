const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const getApps = (subscriptions, addOns) => {
  var myApps = [];
  for (const sub of subscriptions) { //[{subscription:{addons:{}}},{}]
    for (const add of addOns) {
      for (const sub_add of sub.subscription.addons) {
        if (sub_add.id === add.id) {
          myApps.push({
            name: add.name,
            src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
            url: add.cf_site_url || 'https://www.google.com',
            disabled: sub.subscription.status === "cancelled" && sub_add.amount > 0,
            reason: sub.subscription.status === "cancelled" ? sub.subscription.cancel_reason : ''
          });
        }
      }
    }
  }
  return myApps;
}

const addOns = [
  {
    id: 1,
    name: 'Discourse',
    cf_site_url: 'https://www.google.com',
  },
  {
    id: 2,
    name: 'Zendesk',
    cf_site_url: 'https://www.google.com',
  },
  {
    id: 3,
    name: 'Mailchimp',
    cf_site_url: 'https://www.google.com',
  },
];

const planes = {
  "Free": [
    {
      subscription: {
        status: 'paid',
        addons: [{ id: '1', amount: 1 }],
      },
    },
  ],
  "Full": [
    {
      subscription: {
        status: 'paid',
        addons: [{ id: '1', amount: 1 }, { id: 2, amount: 1 }, { id: 3, amount: 1 }],
      },
    },
  ],
  "Free_cancelled": [
    {
      subscription: {
        status: 'cancelled',
        reason: 'testing',
        addons: [{ id: '1', amount: 1 }],
      },
    },
  ],
  "Full_cancelled": [
    {
      subscription: {
        status: 'cancelled',
        reason: 'testing',
        addons: [{ id: 1, amount: 1 }, { id: 2, amount: 1 }, { id: 3, amount: 1 }],
      },
    },
  ],
}

const apps = {
  "Free": [
    {
      name: 'Discourse',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: ''
    }
  ],
  "Full": [
    {
      name: 'Discourse',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: ''
    },
    {
      name: 'Zendesk',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: ''
    },
    {
      name: 'Mailchimp',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: ''
    },
  ],
  "Free_cancelled": [
    {
      name: 'Discourse',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: 'testing'
    }
  ],
  "Full_cancelled": [
    {
      name: 'Discourse',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: 'testing'
    },
    {
      name: 'Zendesk',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: 'testing'
    },
    {
      name: 'Mailchimp',
      src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
      url: 'https://www.google.com',
      disabled: false,
      reason: 'testing'
    },
  ]
}

function whatAreMyApps(subscription, addons) {
  return getApps(subscription, addons);
}

Given('I have {string} access with {string} status', function (access, status) {
  var key = access;
  if (status === "cancelled") {
    key += "_cancelled"
  }
  this.plan = planes[key]
  this.response = apps[key]
});

When('I want to see my apps', function () {
  this.actualAnswer = whatAreMyApps(this.plan, addOns);
});

Then('I should see the apps I have access to', () => {
  assert.strictEqual(this.response, this.actualAnswer);
});
