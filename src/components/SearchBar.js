import { makeStyles, TextField } from '@material-ui/core';
import { MyContext } from '../contexts/MyContext';

const useStyles = makeStyles(() => ({
  searchBar: {
    marginBottom: 20,
    width: '100%',
  },
}));

const SearchBar = () => {
  const { search, setSearch, setPage } = MyContext();

  const classes = useStyles();

  return (
    <TextField className={classes.searchBar} label='Search For A Crypto Currency...' variant='outlined' value={search} onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }} />
  );
};

export default SearchBar;