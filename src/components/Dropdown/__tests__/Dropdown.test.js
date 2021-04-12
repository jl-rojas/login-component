import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAuth0 } from '@auth0/auth0-react';
import Dropdown from '../';
import { I18Provider } from '../../../i18n';

jest.mock('@auth0/auth0-react');

const user = {
  picture: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
  given_name: 'José Pérez',
  'http://localhost:3000/roles': ['User'],
};
const logout = jest.fn();
const info = {
  subscription: {
    addOns: [
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
    ],
    subscriptions: [
      {
        subscription: {
          status: 'cancelled',
          addons: [{ id: '1', amount: 1 }],
        },
      },
    ],
  },
};

describe('<Dropdown/>', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn(),
    });
  });
  it('should render an focusable activator to toggle the dropdown', () => {
    const dropdown = render(
      <I18Provider>
        <Dropdown user={user} logout={logout} info={info} />
      </I18Provider>
    );

    expect(dropdown.getByTestId('dropdown-activator')).toBeInTheDocument();
    const activator = dropdown.getByTestId('dropdown-activator');
    activator.focus();
    expect(activator).toHaveFocus();

  });
  it('should not display popup', () => {
    const { getByTestId } = render(
      <I18Provider>
        <Dropdown user={user} logout={logout} info={info} />
      </I18Provider>
    );

    expect(getByTestId('dropdown-itemList')).not.toBeVisible();

  });
  it('should display popup', () => {
    const dropdown = render(
      <I18Provider>
        <Dropdown user={user} logout={logout} info={info} />
      </I18Provider>
    );

    const activator = dropdown.getByTestId('dropdown-activator');
    activator.click();
    expect(dropdown.getByTestId('dropdown-itemList')).toBeVisible();

  });
  //   it('should close popup when click outside', () => {
  //     const dropdown = render(
  //       <I18Provider>
  //         <Dropdown user={user} logout={logout} info={info} />
  //         <button onClick={() => { }}>Outside</button>
  //       </I18Provider>
  //     );
  //     const activator = dropdown.getByTestId('dropdown-activator');
  //     activator.click();
  //     expect(dropdown.getByTestId('dropdown-itemList')).toBeVisible();

  //     fireEvent.click(dropdown.getByText("Outside"))
  //     expect(dropdown.getByTestId('dropdown-itemList')).not.toBeVisible();

  //   });
});
