import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@material-ui/core';

const myCtx = createContext();

const MyContextProvider = (props) => {
  const [currency, setCurrency] = useState('SEK');
  const [symbol, setSymbol] = useState('SEK');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    },
    typography: {
      fontFamily: 'Chakra Petch',
    },
  });

  useEffect(() => {
    if (currency === 'SEK') setSymbol('SEK');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <myCtx.Provider value={{ currency, setCurrency, symbol, page, setPage, search, setSearch, darkTheme }}>
      {props.children}
    </myCtx.Provider>
  );
};

export const MyContext = () => {
  return useContext(myCtx);
};

export default MyContextProvider;