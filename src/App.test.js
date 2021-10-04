import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"

import App, { calcularNovoSaldo } from "./App";

describe('Main Component', () => {
  describe('When i open the page', () => {
    test('should name be displayed', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })

    test('should balance be displayed', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })

    test('should transaction button be displayed', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })

  });

  describe('When a transaction occurs', () => {
    test('which is a draw, the value will decrease', () => {

      const values = {
        transacao: 'saque',
        valor: 50
      };

      const updtBalance = calcularNovoSaldo(values, 150);

      expect(updtBalance).toBe(100);
    });

    test('wich is a deposit, the value will increase', () => {
      const values = {
        transacao: 'deposito',
        valor: 100
      };

      const nBalance = calcularNovoSaldo(values, 200);

      console.log("updt: ", nBalance);

      expect(nBalance).toBe(300);
    });

    test('wich is a draw, a transaction needs to be performed', () => {
      render(<App />);

      const balance = screen.getByText('R$ 1000');
      const transaction = screen.getByLabelText('Saque');
      const value = screen.getByTestId('valor');
      const transactionButton = screen.getByText('Realizar operação');

      expect(balance.textContent).toBe('R$ 1000');

      fireEvent.click(transaction, { target: { value: 'saque' } });
      fireEvent.change(value, { target: { value: 10 } });
      fireEvent.click(transactionButton);

      expect(balance.textContent).toBe('R$ 990');
    })

  });

  test('wich is a deposit, a transaction needs to be performed', () => {
    render(<App />);

    const balance = screen.getByText('R$ 1000');
    const transaction = screen.getByLabelText('Depósito');
    const value = screen.getByTestId('valor');
    const transactionButton = screen.getByText('Realizar operação');

    expect(balance.textContent).toBe('R$ 1000');

    fireEvent.click(transaction, { target: { value: 'deposito' } });
    fireEvent.change(value, { target: { value: 10 } });
    fireEvent.click(transactionButton);

    expect(balance.textContent).toBe('R$ 1010');
  })

})
