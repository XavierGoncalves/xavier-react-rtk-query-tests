import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

jest.mock('./hooks', () => ({
  useCurrentUser: () => ({
    name: 'John Doe',
    email: 'john.doe@talkdesk.com'
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  root.render(<App />);
  root.unmount();
});
