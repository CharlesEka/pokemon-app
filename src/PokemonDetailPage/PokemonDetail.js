import React, { Fragment, useState , useEffect } from "react";
import { useParams } from 'react-router-dom';
import { css } from '@emotion/css'
import styled from "@emotion/styled";
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import PokemonDetailHeader from './PokemonDetailHeader'
import PokemonDetailStats from './PokemonDetailStats'
import PokemonDetailStatus from './PokemonDetailStatus'
import PokemonDetailMoves from './PokemonDetailMoves'
import CatchPokemonButton from './CatchPokemonButton'

export default function PokemonDetail(){
    let { name } = useParams();
    const history = useHistory();

    const [pokemon, setPokemon] = useState({});

    const GET_POKEMON = gql`
    query pokemon($name: String!) {
            pokemon(name: $name) {
                id
                name
                height
                weight
                abilities{
                    ability{
                        name
                    }
                    is_hidden
                }
                moves {
                    move {
                        name
                    }
                }
                stats{
                    base_stat
                    stat{
                        name
                    }
                }
                types {
                    type {
                        name
                    }
                }
            }
        }
    `;

    const { data } = useQuery(GET_POKEMON, {
        variables: {
            name: name,
        },
    });

    const BackButton = styled.div`
        z-index: 100;
        width: 45px;
        height: 45px;
        background-color: whitesmoke;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 10px;
        text-align: center;
    `

    useEffect(() => {
        if(data){
            setPokemon(data.pokemon);
        }
    }, [data])

    
    if(pokemon.id === null)
        return (
            <Fragment>
                <BackButton onClick={()=>{history.goBack()}}>
                    <img width='100%' src={window.location.origin + "/image/back-arrow.png"} />
                </BackButton>
                <PokemonDetailHeader
                    pokemonName={pokemon.name ? pokemon.name : undefined} 
                    pokemonId={ pokemon.id ? pokemon.id : undefined} 
                    pokemonTypes={ pokemon.types ? pokemon.types !== null ? pokemon.types : undefined: undefined}/>
                <center>Pokemon Not Found</center>
            </Fragment>
        )
    else
        return (
            <Fragment>
                <BackButton onClick={()=>{history.goBack()}}>
                    <img width='100%' src={window.location.origin + "/image/back-arrow.png"} />
                </BackButton>
                <PokemonDetailHeader
                    pokemonName={pokemon.name ? pokemon.name : undefined} 
                    pokemonId={ pokemon.id ? pokemon.id : undefined} 
                    pokemonTypes={ pokemon.types ? pokemon.types !== null ? pokemon.types : undefined: undefined}/>
                <div className={css`min-height: 50vh;`+' container'}>
                    <div className='row'>
                        <div className="col-12 col-md-5 mt-5">
                            <PokemonDetailStatus
                                pokemonId={pokemon.id ? pokemon.id : undefined}
                                pokemonHeight={ pokemon.height ? pokemon.height : undefined} 
                                pokemonWeight={ pokemon.weight ? pokemon.weight : undefined} 
                                pokemonabilities={ pokemon.abilities ? pokemon.abilities : undefined}/>
                        </div>
                        <div className="mt-5 col-md-7">
                            <PokemonDetailStats 
                                pokemonStats={ pokemon.stats ? pokemon.stats : undefined}/>
                        </div>
                        <div className='col-12 mt-5'>
                            <PokemonDetailMoves 
                                pokemonMoves={ pokemon.moves ? pokemon.moves : undefined}/>
                        </div>
                        <div className={css`height:100px`+' col-12'}></div>
                    </div>
                </div>
                <CatchPokemonButton 
                    pokemonType={ pokemon.types ? pokemon.types !== null ? pokemon.types[0].type.name : undefined: undefined} />
            </Fragment>
            
        )

}