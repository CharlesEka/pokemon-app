import React, { Fragment, useEffect, useContext } from "react";
import GlobalContext from '../GlobalContext';
import PokemonCard from '../SharedComponents/PokemonCard';
import { gql, useQuery } from '@apollo/client';
import ContentLoader from '../SharedComponents/ContentLoader';
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom';

export default function MyPokemon(){
    const history = useHistory();
    const {myPokemonContext} = useContext(GlobalContext)

    const Header = styled.div`
        position: fixed;
        height: 130px;
        width: 100%;
        top: 0;
        background-color: whitesmoke;
        z-index: 100;
        display: flex;
        align-items: flex-end;
    `;

    const BackButton = styled.div`
        z-index: 100;
        width: 45px;
        height: 45px;
        background-color: whitesmoke;
        border-radius: 50%;
        text-align: center;
    `
    
    if(myPokemonContext.data){
        return (
            <Fragment>
                <Header>
                    <div className={css`border-bottom: solid 1.5px gray;`+' container'}>
                        <div className="d-flex justify-content-between">
                            <div className='row'>
                                <BackButton onClick={()=>{history.goBack()}}>
                                    <img width='100%' src={window.location.origin + "/image/back-arrow.png"} />
                                </BackButton>
                                <h3 className={css`font-family: roboto-black`}>
                                    My Pokemon
                                </h3>
                            </div>
                            <a href="https://github.com/" target="_blank" rel="noreferrer">
                                <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                            </a>
                        </div>
                    </div>
                </Header>
                <div className={css`margin-top: 150px;`+' container'}> 
                    <div className='row'>                    
                        {
                            myPokemonContext.data.data ?
                            myPokemonContext.data.data.map((pokemons) =>{
                                return pokemons.map((pokemon) =>{
                                    return <div  className="col-xl-3 col-lg-4 col-sm-6 col-12">                                        
                                        <MemoPokemonCard 
                                            key={`${pokemon.id} ${pokemon.pokemonCustomName}`}
                                            pokemonName={pokemon.pokemonName} 
                                            pokemonCustomName={pokemon.pokemonCustomName} 
                                            pokemonId={pokemon.pokemonId}/>
                                    </div>
                                })
                            }):''
                        }
                    </div> 
                </div>
            </Fragment>
        )
    }
    else{
        var contentLoader = [];
        for (var i = 0; i < 20; i++) {
            contentLoader.push(<ContentLoader key={i} height={'96px'}/>);
        } 
        
        return ( <div className='row'> {contentLoader} </div>)
    }
}

const MemoPokemonCard = React.memo(MyPokemonCard);

function MyPokemonCard({pokemonName, pokemonCustomName, pokemonId}){
    const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            name
            sprites{
                front_default
            }
        }
    }
    `;

    const { data } = useQuery(GET_POKEMON, {
        variables: {
            name: pokemonName.toLowerCase(),
        },
    });

    return (
        <PokemonCard 
            pokemonId={pokemonId} 
            pokemonName={pokemonCustomName} 
            pokemonImage={data ? data.pokemon.sprites.front_default : undefined}
            pokemonOwned={true}/>
    )
}