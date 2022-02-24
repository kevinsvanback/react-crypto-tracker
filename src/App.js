import { makeStyles } from '@material-ui/core';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import CoinPage from './pages/CoinPage';
import HomePage from './pages/HomePage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/coins/:id'} element={<CoinPage />} />
      </Routes>
    </div>
  );
};

export default App;
