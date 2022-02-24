import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { MyContext } from '../contexts/MyContext';

const useStyles = makeStyles(() => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    // color: '#39D4D5',
    color: '#fff',
    // fontFamily: 'Montserrat',
    fontFamily: 'Chakra Petch',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 15,
    // textShadow: '0 0 11px #0ff'
  },
  menu: {
    width: 100,
    height: 40,
    marginRight: 15,
    fontFamily: 'Chakra Petch',
  }
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, setPage, setSearch, darkTheme } = MyContext();

  const onClickHandler = () => {
    setPage(1);
    setSearch('');
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar className={classes.toolBar}>
            <Typography className={classes.title} onClick={onClickHandler} variant='h6'>Crypto Tracker</Typography>

            <Select variant="outlined" className={classes.menu}
              value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={'SEK'}>SEK</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;