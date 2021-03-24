import {getPokemonTypeColor} from '../SharedFunction/pokemonFunction'
import styled from '@emotion/styled'

PokemonType.defaultProps={
    type:'normal',
}

export default function PokemonType({type}){
    let pokemonTypeColor = getPokemonTypeColor(type.toLowerCase());
    
    const PokemonType = styled.div`
        color: white;
        padding: 10px 20px;
        border: 2px white solid;
        border-radius: 30px;
        text-align: center;
        font-size: large;
        margin: 0 0.5rem;
        background-color: ${pokemonTypeColor} !important;
    `

    return (
        <PokemonType>{type.toUpperCase()}</PokemonType>
    )
}