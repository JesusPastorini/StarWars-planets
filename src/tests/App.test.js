import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders App component', () => {
    const { getByTestId } = render(<App />);
    const filterComponent = getByTestId('name-filter');
    const tableComponent = getByTestId('name-filter');

    expect(filterComponent).toBeInTheDocument();
    expect(tableComponent).toBeInTheDocument();
  });
});
