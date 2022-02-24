import { createContext, useContext, useState, useEffect } from 'react';

const myCtx = createContext();

const MyContextProvider = (props) => {
  const [currency, setCurrency] = useState('SEK');
  const [symbol, setSymbol] = useState('SEK');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (currency === 'SEK') setSymbol('SEK');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <myCtx.Provider value={{ currency, setCurrency, symbol, page, setPage, search, setSearch }}>
      {props.children}
    </myCtx.Provider>
  );
};

export const MyContext = () => {
  return useContext(myCtx);
};

export default MyContextProvider;