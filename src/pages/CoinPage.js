import { LinearProgress, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { MyContext } from '../contexts/MyContext';
import numberWithCommas from '../helpers/numberWithCommas';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Chakra Petch'
  },
  description: {
    width: '80%',
    fontFamily: 'Chakra Petch',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'
  },
  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start'
    }
  },
  span: {
    display: 'flex'
  },
  img: {
    marginBottom: 20,
    height: 200
  },
  linearProgress: {
    backgroundColor: '#39D4D5'
  }
}));

const CoinPage = () => {
  const classes = useStyles();
  const [coin, setCoin] = useState();
  const { currency, symbol, darkTheme } = MyContext();
  const { id } = useParams();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  if (!coin) return <LinearProgress className={classes.linearProgress} />;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img className={classes.img} src={coin?.image.large} alt={coin?.name} />
          <Typography className={classes.heading} variant='h3' >
            {coin?.name}
          </Typography>
          <Typography className={classes.description} variant='subtitle1' >
            {parse(coin?.description.en.split('. ')[0])}
          </Typography>
          <div className={classes.marketData} >
            <span className={classes.span}>
              <Typography className={classes.heading} variant='h5' >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant='h5' >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span className={classes.span}>
              <Typography className={classes.heading} variant='h5' >
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              {symbol === 'SEK' ?
                <Typography variant='h5' >
                  {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} {symbol}
                </Typography> :
                <Typography variant='h5' >
                  {symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>}
            </span>
            <span className={classes.span}>
              <Typography className={classes.heading} variant='h5' >
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              {symbol === 'SEK' ?
                <Typography variant='h5' >
                  {numberWithCommas((coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0, -6))} M{symbol}
                </Typography> :
                <Typography variant='h5' >
                  {symbol}{numberWithCommas((coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0, -6))} M
                </Typography>}
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;