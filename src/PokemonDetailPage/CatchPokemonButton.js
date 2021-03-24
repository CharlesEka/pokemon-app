import styled from '@emotion/styled'
import React from 'react'
import {getPokemonTypeColor} from '../SharedFunction/pokemonFunction'

CatchPokemonButton.defaultProps={
    pokemonType:'normal',
    pokemonId:'',
}

export default function CatchPokemonButton({pokemonType, pokemonId}){
    let pokemonTypeColor = getPokemonTypeColor(pokemonType.toLowerCase());

    const CatchPokemonButton = styled.button`
        position: fixed;
        left: calc(50% - 150px);
        bottom: 20px;
        padding: 10px 0;
        width: 300px;
        color: white;
        background-color: ${pokemonTypeColor};
        border-radius: 20px;
        border-color: transparent;
    `;

    return (
        <CatchPokemonButton>
            Catch Pokemon
        </CatchPokemonButton>
    )
}