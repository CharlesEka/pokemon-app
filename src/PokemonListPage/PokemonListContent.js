import React, {Fragment, useContext } from "react";
import { css } from '@emotion/css'
import PokemonCard from '../SharedComponents/PokemonCard';
import ContentLoader from '../SharedComponents/ContentLoader';
import InfiniteScroll from "react-infinite-scroll-component";
import GlobalContext from '../GlobalContext';
import FailedLoadData from '../SharedComponents/FailedLoadData';

export default function PokemonListContent(){
    const {myPokemonContext, pokemonContext} = useContext(GlobalContext)
    
    if(pokemonContext.data){
        return (
            <Fragment>
                <InfiniteScroll
                    className='row'
                    dataLength={pokemonContext.data.results.length}
                    next={pokemonContext.fetchMore}
                    hasMore={true}
                    loader={pokemonContext.isError ? <FailedLoadData loadFunction={pokemonContext.fetchMore}/> :<ContentLoader />}
                    endMessage={
                        <div className={css`textAlign: 'center'`}>
                            <b>You have seen all pokemons</b>
                        </div>
                    }
                >
        
                    {pokemonContext.data.results.map((pokemon) =>{
                        let owned = false;
                        if(myPokemonContext.data){
                            if(pokemon.id in myPokemonContext.data.data)
                                owned = true;
                        }
                        return <MemoPokemonCard 
                            key={pokemon.id}
                            pokemonId={pokemon.id} 
                            pokemonName={pokemon.name} 
                            pokemonImage={pokemon.image}
                            pokemonOwned={owned}/>
                    })}
                
                </InfiniteScroll>
            </Fragment>
        )
    }
    else{
        var contentLoader = [];
        for (var i = 0; i < 20; i++) {
            contentLoader.push(<ContentLoader key={i} height={'96px'}/>);
        } 

        if(pokemonContext.isError)
            return (<FailedLoadData loadFunction={pokemonContext.fetchMore}/>)
        else
            return ( <div className='row'> {contentLoader} </div>)
    }
}

const MemoPokemonCard = React.memo(PokemonCard);