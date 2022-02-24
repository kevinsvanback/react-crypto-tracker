import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { MyContext } from '../../contexts/MyContext';
import numberWithCommas from '../../helpers/numberWithCommas';

let profit;

const useStyles = makeStyles(() => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center'
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'Chakra Petch'
  },
  img: {
    marginBottom: 10,
    height: 80
  },
  changePercentage: {
    color: profit > 0 ? 'rgb(14, 203, 129' : 'red',
    fontWeight: 500
  },
  symbol: {
    fontSize: 22, fontWeight: 500
  }
}));

const Carousel = () => {
  const classes = useStyles();

  const [trending, setTrending] = useState([]);

  const { currency, symbol } = MyContext();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map(coin => {
    profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img className={classes.img} src={coin?.image} alt={coin.name} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span className={classes.changePercentage}>{profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
        </span>
        {symbol === 'SEK' ? <span className={classes.symbol}>{numberWithCommas(coin?.current_price.toFixed(2))} {symbol}</span>
          : <span className={classes.symbol}>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</span>}
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;