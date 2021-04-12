import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppWidget from '../AppWidget';

describe('AppWidget component', () => {
  it('should be rendered', () => {
    const widget = render(<AppWidget />);
    expect(widget).toBeTruthy();
  })

  describe('render with props', () => {
    it('not disabled', () => {
      const props = {
        name: 'Discourse',
        src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
        alt: 'Discourse',
        disabled: false,
        url: 'https://www.google.com',
      };
      render(<AppWidget {...props} />);
      expect(screen.getByText('Discourse')).toBeVisible();
    });

    it('disabled', () => {
      const props = {
        name: 'Discourse',
        src: 'https://i.mdel.net/i/db/2020/4/1332723/1332723-500w.jpg',
        alt: 'Discourse',
        disabled: true,
        url: 'https://www.google.com',
      };
      render(<AppWidget {...props} />);
      expect(screen.getByAltText('Discourse')).toHaveAttribute('disabled');
    })
  })
})