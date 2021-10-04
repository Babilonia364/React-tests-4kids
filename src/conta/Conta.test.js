import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import Conta from "./Conta";

describe('Conta Component', () => {
  test('Display account balance as monetary value', () => {
    render(<Conta saldo={1000} />);

    const balance = screen.getByTestId('saldo-conta');

    expect(balance.textContent).toBe('R$ 1000');
  })

  test('Call a function when the button is pressed', () => {
    const functionTransaction = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={functionTransaction} />);

    fireEvent.click(screen.getByText('Realizar operação'));

    expect(functionTransaction).toHaveBeenCalled();
  })
  

})
