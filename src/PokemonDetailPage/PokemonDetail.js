import React from "react";
import { useParams } from 'react-router-dom';

export default function PokemonDetail(props){
    let { id } = useParams();

    return (
        <h1>Pokemon Detail {id}</h1>
    )
}