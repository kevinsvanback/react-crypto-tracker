import { createContext, useContext, useState, useEffect } from 'react';

const myCtx = createContext();

const MyContextProvider = (props) => {
  const [currency, setCurrency] = useState('SEK');
  const [symbol, setSymbol] = useState('sek');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currency === 'SEK') setSymbol('sek');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <myCtx.Provider value={{ currency, setCurrency, symbol, page, setPage }}>
      {props.children}
    </myCtx.Provider>
  );
};

export const MyContext = () => {
  return useContext(myCtx);
};

export default MyContextProvider;