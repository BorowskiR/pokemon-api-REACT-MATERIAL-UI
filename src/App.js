import { Route, Switch } from 'react-router';
import Pokedex from './components/Pokedex';
import Pokemon from './components/PokemonDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route exact path="/:id" render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
}

export default App;
