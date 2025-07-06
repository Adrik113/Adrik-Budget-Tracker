import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the app with initial elements', () => {
  render(<App />);

  expect(screen.getByText(/Income:/i)).toBeInTheDocument();
  expect(screen.getByText(/No expenses recorded/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Expenses:/i)).toBeInTheDocument();
});

