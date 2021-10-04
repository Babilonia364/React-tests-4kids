import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe('Transaction Component', () => {
  test('snapshot should always be the same', () => {
    const { container } = render(<Transacao
      data="08/09/2020"
      tipo="saque"
      valor="20.00"
    />);

    expect(container.firstChild).toMatchSnapshot();
  });
  
})
