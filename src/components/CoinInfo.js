import { CircularProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { MyContext } from '../contexts/MyContext';
import SelectButton from './SelectButton';

Chart.register(...registerables);
Chart.defaults.font.family = 'Chakra Petch';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    }
  },
  circularProgress: {
    color: '#39D4D5'
  },
  selectButtonsContainer: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  }
}));

const CoinInfo = (props) => {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, darkTheme } = MyContext();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(props.coin.id, days, currency));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [currency, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? <CircularProgress className={classes.circularProgress} size={250} thickness={1} />
          : (
            <>
              <Line
                data={{
                  labels: historicalData.map(coin => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes().toString().padStart(2, '0')} PM` : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} AM`;

                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [{
                    data: historicalData.map(coin => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: '#39D4D5'
                  }]
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1
                    }
                  }
                }}
              />
              <div className={classes.selectButtonsContainer}>
                {chartDays.map(day => (<SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>{day.label}</SelectButton>))}
              </div>
            </>
          )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;