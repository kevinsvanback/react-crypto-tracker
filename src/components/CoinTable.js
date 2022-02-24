import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { ThemeProvider, Typography, Container, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MyContext } from '../contexts/MyContext';
import numberWithCommas from '../helpers/numberWithCommas';

let profit;

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
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: '#39D4D5'
    }
  },
  container: {
    textAlign: 'center'
  },
  typography: {
    margin: 18
  },
  linearProgress: {
    backgroundColor: '#39D4D5'
  },
  tableHead: {
    backgroundColor: '#39D4D5'
  },
  header: {
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Chakra Petch'
  },
  coinCell: {
    display: 'flex',
    gap: 15
  },
  coinCellImage: {
    marginBottom: 10,
    height: 50
  },
  coinCellContainer: {
    display: "flex",
    flexDirection: "column"
  },
  coinCellSymbol: {
    textTransform: "uppercase",
    fontSize: 22,
  },
  coinCellName: {
    color: "darkgrey"
  },
  changePercentage: {
    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
    fontWeight: 500,
  }
});

const CoinTable = () => {
  const classes = useStyles();

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

  const searchHandler = () => {
    return coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>

        <Typography className={classes.typography} variant='h4'>
          Cryptocurrency Prices By Market Cap
        </Typography>

        <TextField className={classes.searchBar} label='Search For A Crypto Currency...' variant='outlined' value={search} onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }} />

        <TableContainer component={Paper}>
          {loading && <LinearProgress className={classes.linearProgress} />}
          {!loading && (
            <Table>
              <TableHead className={classes.tableHead} >
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => {
                    return (
                      <TableCell className={classes.header} key={head} align={head === 'Coin' ? 'left' : 'right'}>
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchHandler().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                  profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow className={classes.row} onClick={() => navigate(`/coins/${row.id}`)} key={row.name}>
                      <TableCell className={classes.coinCell} component='th' scope='row' >
                        <img className={classes.coinCellImage} src={row?.image} alt={row.name} />
                        <div className={classes.coinCellContainer}>
                          <span className={classes.coinCellSymbol}>{row.symbol}</span>
                          <span className={classes.coinCellName}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol === 'SEK' ? <>{numberWithCommas(row.current_price.toFixed(2))} {symbol}</> : <>{symbol}{numberWithCommas(row.current_price.toFixed(2))}</>}
                      </TableCell>
                      <TableCell className={classes.changePercentage} align="right">
                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
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

        <Pagination className={classes.pagination}
          count={Number((searchHandler().length / 10).toFixed(0))}
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }} />

      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;