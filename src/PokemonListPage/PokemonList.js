import React, { Fragment } from "react";

import PokemonListHeader from "./PokemonListHeader"
import PokemonListStats from "./PokemonListStats"
import PokemonListContent from "./PokemonListContent"

export default function PokemonList(){

    return (
        <Fragment>
            <PokemonListHeader/>
            <div className="container">
                <PokemonListStats/>
                <PokemonListContent/>
            </div>
        </Fragment>
    )
    
}