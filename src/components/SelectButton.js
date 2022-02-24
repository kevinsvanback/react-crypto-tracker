import { makeStyles } from '@material-ui/core';
import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: '1px solid #39D4D5',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Chakra Petch',
      cursor: 'pointer',
      backgroundColor: selected ? '#39D4D5' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      width: '22%',
      '&:hover': {
        backgroundColor: '#39D4D5',
        color: 'black'
      }
    }
  });

  const classes = useStyles();

  return (
    <span className={classes.selectButton} onClick={onClick}>{children}</span>
  );
};

export default SelectButton;