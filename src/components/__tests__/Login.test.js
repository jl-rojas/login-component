import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import '@testing-library/jest-dom/extend-expect';

import Login from '../Login';
import { I18Provider } from '../../i18n';


jest.mock('@auth0/auth0-react');

describe('Login component with user authenticated', () => {
  const user = {
    given_name: "Juan",
    'http://localhost:3000/roles': ['User']
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: user,
      getAccessTokenSilently: jest.fn()
    });
  });

  test("renders user's name", async () => {
    render(<I18Provider><Login /></I18Provider>);
    expect(screen.getByText(user.given_name)).toBeInTheDocument();
  });
});

describe("Login component with user not authenticated", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: {},
    });
  });

  describe('render the buttons', () => {
    test('Register button', async () => {
      render(<I18Provider><Login /></I18Provider>);
      expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
    });
    test('login button', async () => {
      render(<I18Provider><Login /></I18Provider>);
      expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    });
  })
});
