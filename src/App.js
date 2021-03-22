import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from "react";
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client"
import {onError} from "@apollo/client/link/error";

import MyPokemon from "./MyPokemonPage/MyPokemon"
import PokemonList from "./PokemonListPage/PokemonList"
import PokemonDetail from "./PokemonDetailPage/PokemonDetail"

const errorLink = onError(({graphqlErrors, networkError, path}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      console.error(`graphql error ${message}| location : ${location}| path : ${path}`)
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

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/"> <PokemonList /> </Route>
              <Route path="/pokemon/:id/detail"> <PokemonDetail /> </Route>
              <Route path="/my-pokemon"> <MyPokemon /> </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

