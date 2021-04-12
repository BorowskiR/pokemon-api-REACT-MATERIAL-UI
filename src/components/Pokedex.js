import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockData from '../mockData';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useStyles = makeStyles({
  pokedexContainer: {
    padding: '20px 50px',
  },
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
});

function Pokedex(props) {
  const [pokemonData, setPokemonData] = useState(mockData);
  const { history } = props;

  const classes = useStyles();

  const getPokemonCard = (pokemonId) => {
    const { id, name } = pokemonData[`${pokemonId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    console.log(pokemonData[`${id}`]);
    return (
      <Grid item xs={12} sm={4} key={id}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: '130px', height: '130px' }}
          ></CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${capitalizeFirstLetter(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={1} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemon) => getPokemonCard(pokemon))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Pokedex;
