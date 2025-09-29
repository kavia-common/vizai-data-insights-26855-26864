import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sidebar title vizAi and hamburger toggle', () => {
  render(<App />);
  const title = screen.getByText(/vizAi/i);
  expect(title).toBeInTheDocument();

  const toggle = screen.getByRole('button', { name: /open sidebar/i });
  expect(toggle).toBeInTheDocument();
  expect(toggle).toHaveAttribute('aria-controls', 'app-sidebar');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
