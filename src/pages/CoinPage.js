import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from '../contexts/MyContext';
import { SingleCoin } from "../config/api";
import axios from "axios";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = MyContext();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

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
  }));

  const classes = useStyles();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  let symbolIsSek;
  symbol === 'SEK' ? symbolIsSek = true : symbolIsSek = false;

  if (!coin) return <LinearProgress style={{ backgroundColor: '#39D4D5' }} />;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img src={coin?.image.large} alt={coin?.name} height='200' style={{ marginBottom: 20 }} />
          <Typography variant='h3' className={classes.heading} >
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' className={classes.description} >
            {parse(coin?.description.en.split('. ')[0])}
          </Typography>
          <div className={classes.marketData} >
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading} >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant='h5' style={{ fontFamily: 'Chakra Petch' }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading} >
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              {symbolIsSek ? <Typography variant='h5' style={{ fontFamily: 'Chakra Petch' }}>
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} {symbol}
              </Typography> : <Typography variant='h5' style={{ fontFamily: 'Chakra Petch' }}>
                {symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>}
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading} >
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              {symbolIsSek ? <Typography variant='h5' style={{ fontFamily: 'Chakra Petch' }}>
                {numberWithCommas((coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0, -6))} M{symbol}
              </Typography> : <Typography variant='h5' style={{ fontFamily: 'Chakra Petch' }}>
                {symbol}{numberWithCommas((coin.market_data.market_cap[currency.toLowerCase()]).toString().slice(0, -6))} M
              </Typography>}
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;