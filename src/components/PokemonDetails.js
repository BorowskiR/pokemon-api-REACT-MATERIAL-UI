import React from 'react';

function Pokemon(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;

  return <div>{`this is the pokemon page for pokemon #${id}`}</div>;
}

export default Pokemon;
