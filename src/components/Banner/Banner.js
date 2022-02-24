import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around'
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant='h2' style={{
            fontWeight: 'bold',
            marginBottom: 15,
            fontFamily: 'Chakra Petch',
            textShadow: '0 0 11px #0ff'
          }}>
            Crypto Tracker
          </Typography>
          <Typography variant='subtitle2' style={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontFamily: 'Chakra Petch',
            textShadow: '0 0 11px #0ff'
          }}>
            Get all the info regarding your favorite crypto currency
          </Typography>
        </div>
        <Carousel></Carousel>
      </Container>
    </div>
  );
};

export default Banner;