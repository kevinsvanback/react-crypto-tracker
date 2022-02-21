import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

const CryptoContext = (props) => {
  const [currency, setCurrency] = useState('SEK');
  const [symbol, setSymbol] = useState('kr');

  useEffect(() => {
    if (currency === 'SEK') setSymbol('kr');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);


  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>{props.children}</Crypto.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Crypto);
};

export default CryptoContext;
