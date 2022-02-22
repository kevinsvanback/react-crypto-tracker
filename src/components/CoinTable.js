import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { CoinList } from '../config/api';
import { CryptoState } from '../contexts/CryptoContext';
import { createTheme, ThemeProvider, Typography, Container, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';


const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));
    setCoins(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  console.log(coins);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  });

  const searchHandler = () => {
    return coins.filter(coin => {
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
    });
  };

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  });

  const classes = useStyles();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency prices by market cap
        </Typography>
        <TextField label='Search for a crypto currency' variant='outlined' style={{ marginBottom: 20, width: '100%' }} onChange={(e) => setSearch(e.target.value)} />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => {
                    return (
                      <TableCell style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat'
                      }}
                        key={head}
                        align={head === 'Coin' ? '' : 'right'}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* searchHandler().map */}
                {coins.map(row => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow onClick={() => <Navigate to={`/coins/${row.id}`} />} className={classes.row} key={row.name}>
                      <TableCell component='th' scope='row' style={{
                        display: 'flex',
                        gap: 15
                      }}>
                        <img src={row?.image} alt={row.name} height='50' style={{ marginBottom: 10 }} />

                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M

                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;