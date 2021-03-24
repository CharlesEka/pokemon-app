import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from "react";
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client"
import {onError} from "@apollo/client/link/error";
import {GlobalProvider} from "./GlobalContext";

import MyPokemon from "./MyPokemonPage/MyPokemon"
import PokemonList from "./PokemonListPage/PokemonList"
import PokemonDetail from "./PokemonDetailPage/PokemonDetail"
import CatchPokemon from './CatchPokemonPage/CatchPokemon';

const errorLink = onError(({graphqlErrors, networkError, path}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      console.error(`graphql error ${message}| location : ${location}| path : ${path}`);
      return `graphql error ${message}| location : ${location}| path : ${path}`;
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "https://graphql-pokeapi.vercel.app/api/graphql"}),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
      <ApolloProvider client={client}>
        <GlobalProvider>
          <Router>
            <div className="App">
              <div className="content">
                <Switch>
                  <Route exact path="/"> <PokemonList /> </Route>
                  <Route path="/pokemon/:name/detail"> <PokemonDetail /> </Route>
                  <Route path="/my-pokemon"> <MyPokemon /> </Route>
                  <Route path="/catch/:name"> <CatchPokemon /> </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </GlobalProvider>
      </ApolloProvider>
  );
}

export default App;