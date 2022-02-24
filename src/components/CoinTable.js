import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { ThemeProvider, Typography, Container, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MyContext } from '../contexts/MyContext';
import numberWithCommas from '../helpers/numberWithCommas';

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: 'Chakra Petch',
  },
  searchBar: {
    marginBottom: 20,
    width: '100%',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: '#39D4D5'
    }
  }
});

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency, symbol, page, setPage, search, setSearch, darkTheme } = MyContext();

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const classes = useStyles();

  const searchHandler = () => {
    return coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ margin: 18 }}>
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField className={classes.searchBar} label='Search For A Crypto Currency...' variant='outlined' onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }} value={search} />

        <TableContainer component={Paper}>
          {loading && <LinearProgress style={{ backgroundColor: '#39D4D5' }} />}
          {!loading && (
            <Table>
              <TableHead style={{ backgroundColor: '#39D4D5' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => {
                    return (
                      <TableCell key={head} align={head === 'Coin' ? 'left' : 'right'}
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Chakra Petch'
                        }}>
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {searchHandler().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow onClick={() => navigate(`/coins/${row.id}`)} className={classes.row} key={row.name}>
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
                            }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol === 'SEK' ? <>{numberWithCommas(row.current_price.toFixed(2))} {symbol}</> : <>{symbol}{numberWithCommas(row.current_price.toFixed(2))}</>}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol === 'SEK' ? <>{numberWithCommas(row.market_cap.toString().slice(0, -6))} M{symbol}</> : <>{symbol}{numberWithCommas(row.market_cap.toString().slice(0, -6))} M</>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination count={Number((searchHandler().length / 10).toFixed(0))} style={{
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
          page={page}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }} />
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;