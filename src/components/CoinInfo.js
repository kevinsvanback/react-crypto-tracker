import { CircularProgress, createTheme, LinearProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { MyContext } from '../contexts/MyContext';
import SelectButton from './SelectButton';

Chart.register(...registerables);

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
  }
}));

const CoinInfo = (props) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, darkTheme } = MyContext();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(props.coin.id, days, currency));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  Chart.defaults.font.family = 'Chakra Petch';

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress style={{ color: '#39D4D5' }} size={250} thickness={1} />
        ) : (
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
            <div style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'space-around',
              width: '100%',
            }}>
              {chartDays.map(day => (
                <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days} >{day.label}</SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;