import React,{useState , useEffect, createContext} from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client';
import {getAllPokemonGroupByKey} from './SharedFunction/pokemonLocalDB'

const GlobalContext = createContext();

export const GlobalProvider = props => {
    /**=========================================================
     * VARIABLE
    ============================================================*/

    let nextOffset = 0;

    const [pokemonContext, setPokemonContext] = useState({
        data : undefined,
        isLoading : true,
        isError : false,
        fetchMore: undefined,
    });
    const [myPokemonContext, setMyPokemonContext] = useState({
        data : undefined,
        refreshMyPokemon: refreshMyPokemon
    })

    /**=========================================================
     * POKEMON GRAPHQL FUNTION
    ============================================================*/

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
    `

    const { loading,error,data, fetchMore } = useQuery(GET_POKEMONS,{
        variables: {
            limit: 50,
            offset: 0
        },
    });

    function fetchMorePokemon(){
        fetchMore({
            variables: { limit: 50, offset:nextOffset },
            updateQuery:(prevResult, result) => {
                if (result){
                    result.fetchMoreResult.pokemons.results = [
                        ...prevResult.pokemons.results,
                        ...result.fetchMoreResult.pokemons.results
                    ];
                }
                return result.fetchMoreResult;
            }
        }).catch(e => {
            setPokemonContext(prevPokemonContext => ({...prevPokemonContext, error: true}));
        });
    }

    useEffect(() => {
        setPokemonContext(
            {
                data : data ? data.pokemons : undefined,
                isLoading : loading,
                isError : error === undefined ? false : true,
                fetchMore: fetchMorePokemon,
            }
        );
        nextOffset = data ? data.pokemons.nextOffset : nextOffset
    }, [data,error,loading]);

    /**=========================================================
     * MY POKEMON LOCALBASE FUNTION
    ============================================================*/

    useEffect(() => {
        getAllPokemonGroupByKey().then( 
        MyPokemon =>{
            setMyPokemonContext(prevMyPokemonContext => ({...prevMyPokemonContext, data: MyPokemon}));
        }).catch(e =>{
            console.error(e);
        })
    },[])

    function refreshMyPokemon(){
        getAllPokemonGroupByKey().then( 
        MyPokemon =>{
            setMyPokemonContext(prevMyPokemonContext => ({...prevMyPokemonContext, data: MyPokemon}));
        }).catch(e =>{
            console.error(e);
        })
    }

    /**=========================================================
     * RETURN
    ============================================================*/
    return (
        <GlobalContext.Provider value={({pokemonContext,myPokemonContext})}>{props.children}</GlobalContext.Provider>
    );
};

export const GlobalConsumer = GlobalContext.Consumer;
export default GlobalContext;

GlobalContext.propTypes = {
    children: PropTypes.node.isRequired,
};