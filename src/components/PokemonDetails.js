import React, { useState } from 'react';
import mockData from '../mockData';
import { Typography } from '@material-ui/core';
import { capitalizeFirstLetter } from '../helpers/capitalizeName';

function Pokemon(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [pokemon, setPokemon] = useState(mockData[`${id}`]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <div>
        <Typography variant="h1">
          {`${id}.`} {capitalizeFirstLetter(name)} <img src={front_default} />
        </Typography>
        <img
          src={fullImageUrl}
          alt="poke"
          style={{ height: '150px', width: '150px' }}
        />
        <Typography variant="body1">species: {species.name}</Typography>
        <Typography variant="h6">height: {height}</Typography>
        <Typography variant="h6">weight {weight}</Typography>
        <Typography variant="h6">
          Typ:
          {types.map((t) => {
            const { type } = t;
            const { name } = type;
            return <Typography key={name}>{name}</Typography>;
          })}
        </Typography>
      </div>
    );
  };

  return <>{generatePokemonJSX()}</>;
}

export default Pokemon;
