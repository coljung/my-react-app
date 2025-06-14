import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe('Home Component', () => {
  test('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to My React App')).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(<Home />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Modern Design')).toBeInTheDocument();
    expect(screen.getByText('Fast Performance')).toBeInTheDocument();
    expect(screen.getByText('Easy to Use')).toBeInTheDocument();
  });

  test('counter button increments count', () => {
    render(<Home />);
    const button = screen.getByText('Count is 0');
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Count is 1')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Count is 2')).toBeInTheDocument();
  });
}); 