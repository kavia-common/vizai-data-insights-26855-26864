import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sidebar title vizAi', () => {
  render(<App />);
  const title = screen.getByText(/vizAi/i);
  expect(title).toBeInTheDocument();
});
