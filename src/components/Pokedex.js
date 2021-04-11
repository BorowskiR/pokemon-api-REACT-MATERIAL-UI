import React from 'react';
import { AppBar, Toolbar, Grid } from '@material-ui/core';

function Pokedex() {
  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          item1
        </Grid>
        <Grid item xs={4}>
          item2
        </Grid>
      </Grid>
    </>
  );
}

export default Pokedex;
