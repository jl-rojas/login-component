export const getApps = ({ subscriptions, addOns }) => {
  var myApps = [];
  for (const sub of subscriptions) {
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