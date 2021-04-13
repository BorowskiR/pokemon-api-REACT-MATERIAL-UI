import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import mockData from '../mockData';
import { capitalizeFirstLetter } from '../helpers/capitalizeName';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    padding: '20px 50px',
  },
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  searchInput: {
    width: '200px',
    margin: '5px',
  },
}));

function Pokedex(props) {
  const [pokemonData, setPokemonData] = useState(mockData);
  const { history } = props;
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`).then((res) => {
      const { data } = res;
      const { results } = data;

      const newPokemonData = {};

      results.forEach((pokemon, idx) => {
        newPokemonData[idx + 1] = {
          id: idx + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            idx + 1
          }.png`,
        };
      });

      setPokemonData(newPokemonData);
    });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const createPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

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
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              label="Pokemon"
              className={classes.searchInput}
              onChange={handleChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={1} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) => {
            return (
              pokemonData[pokemonId].name.includes(filter) &&
              createPokemonCard(pokemonId)
            );
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Pokedex;
