import React, {useState , useEffect, Fragment } from "react";
import { css, keyframes  } from '@emotion/css'
import styled from '@emotion/styled'
import { gql, useQuery } from '@apollo/client';
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonListItem from "./PokemonListItem";


export default function PokemonListContent(){
    const [pokemons, setPokemons] = useState([]);
    const [lastPokemon, setLastPokemon] = useState(0);
    const [isError, setIsError] = useState(false);
    const [hasMorePokemon, setHasMorePokemon] = useState(true);
    
    const GET_POKEMONS = gql`
        query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
                count
                nextOffset
                results {
                    id
                    name
                    image
                }
            }
        }
        `;

    const { error, data, fetchMore } = useQuery(GET_POKEMONS, {
        variables: {
            limit: 50,
            offset: 0
        },
    });

    const fetchMorePokemon = () => {
        fetchMore({
            variables: { limit: 50, offset:lastPokemon },
            updateQuery:(prevResult, result) => {
                if (result){
                    console.log(result.fetchMoreResult);
                    result.fetchMoreResult.pokemons.results = [
                        ...prevResult.pokemons.results,
                        ...result.fetchMoreResult.pokemons.results
                    ];
                }
                return result.fetchMoreResult;
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    useEffect(() => {
        if(data){
            setPokemons(data.pokemons.results);
            setLastPokemon(data.pokemons.nextOffset);
            setHasMorePokemon(data.pokemons.nextOffset <= 0 ? false : true);
        }
    }, [data])
    
    useEffect(() => {
        if(error!==undefined)
            setIsError(true);
    },[error]);
    
    if(data){
        return (
            <Fragment>
                <InfiniteScroll
                    className='row'
                    dataLength={pokemons.length}
                    next={fetchMorePokemon}
                    hasMore={hasMorePokemon}
                    loader={isError ? <ErrorLoadData loadFunction={fetchMorePokemon}/> :<ContentLoader />}
                    endMessage={
                        <div className={css`textAlign: 'center'`}>
                            <b>You have seen all pokemons</b>
                        </div>
                    }
                >
        
                    {pokemons.map((pokemon) =>{
                        return <MemoPokemonListItem 
                            pokemonId={pokemon.id} 
                            pokemonName={pokemon.name} 
                            pokemonImage={pokemon.image}/>
                    })}
                
                </InfiniteScroll>
                <button onClick={()=>fetchMorePokemon()}>
                    loadMore
                </button>
            </Fragment>
        )
    }else{
        var contentLoader = [];
        for (var i = 0; i < 20; i++) {
            contentLoader.push(<ContentLoader key={i}/>);
        } 

        if(isError)
            return (<ErrorLoadData loadFunction={fetchMorePokemon}/>)
        else
            return ( <div className='row'> {contentLoader} </div>)
    }
}

const MemoPokemonListItem = React.memo(PokemonListItem);

function ContentLoader(){
    const loading = keyframes`
        from{
            width: 0%
        }
        to{
            width: 100%;
        }
    `;

    const LoadingCard = styled.div`
        border-radius: 10px;
        position: relative;
        margin: 0px;
        background-color: whitesmoke;
    `;

    const LoadingBar = styled.div`
        height: 96px;
        background: linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(238,238,238,0.7) 100%);
        border-radius: 10px;
        animation: ${loading} 0.7s infinite;
    `;

    return (
        <div className={css`padding: 0; padding: 0.5rem;`+' col-xl-3 col-lg-4 col-sm-6 col-12'}>
            <LoadingCard>
                <LoadingBar></LoadingBar>
            </LoadingCard>
        </div>
    )
}

function ErrorLoadData({loadFunction}){
    return (
        <div className={css`height: 200px;`+' col-12 d-flex align-content-center flex-wrap row'}>
            <div className="col-12 d-flex justify-content-center">Failed Load Data</div>
            <br />
            <div className={css`cursor: pointer;`+" mt-3 col-12 d-flex justify-content-center"} onClick={() => loadFunction()}>
                <svg height="40px" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="m61.496094 279.609375c-.988282-8.234375-1.496094-16.414063-1.496094-23.609375 0-107.402344 88.597656-196 196-196 50.097656 0 97 20.199219 131.5 51.699219l-17.300781 17.601562c-3.898438 3.898438-5.398438 9.597657-3.898438 15 1.800781 5.097657 6 9 11.398438 10.199219 3.019531.605469 102.214843 32.570312 95.898437 31.300781 8.035156 2.675781 19.917969-5.894531 17.703125-17.699219-.609375-3.023437-22.570312-113.214843-21.300781-106.902343-1.199219-5.398438-5.101562-9.898438-10.5-11.398438-5.097656-1.5-10.800781 0-14.699219 3.898438l-14.699219 14.398437c-45.300781-42.296875-107.503906-68.097656-174.101562-68.097656-140.699219 0-256 115.300781-256 256v.597656c0 8.457032.386719 14.992188.835938 19.992188.597656 6.625 5.480468 12.050781 12.003906 13.359375l30.816406 6.160156c10.03125 2.007813 19.050781-6.402344 17.839844-16.5zm0 0"/><path d="m499.25 222.027344-30.90625-6.296875c-10.042969-2.046875-19.125 6.371093-17.890625 16.515625 1.070313 8.753906 1.546875 17.265625 1.546875 23.753906 0 107.398438-88.597656 196-196 196-50.097656 0-97-20.199219-131.5-52l17.300781-17.300781c3.898438-3.898438 5.398438-9.597657 3.898438-15-1.800781-5.101563-6-9-11.398438-10.199219-3.019531-.609375-102.214843-32.570312-95.898437-31.300781-5.101563-.898438-10.203125.601562-13.5 4.199219-3.601563 3.300781-5.101563 8.699218-4.203125 13.5.609375 3.019531 22.574219 112.210937 21.304687 105.898437 1.195313 5.402344 5.097656 9.902344 10.496094 11.398437 6.261719 1.570313 11.488281-.328124 14.699219-3.898437l14.402343-14.398437c45.296876 42.300781 107.5 69.101562 174.398438 69.101562 140.699219 0 256-115.300781 256-256v-.902344c0-6.648437-.242188-13.175781-.796875-19.664062-.570313-6.628906-5.433594-12.074219-11.953125-13.40625zm0 0"/></svg>
            </div>
        </div>
    );
}