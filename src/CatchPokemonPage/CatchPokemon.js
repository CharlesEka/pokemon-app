import React, { useEffect, useState }  from "react"
import { css, keyframes  } from '@emotion/css'
import styled from "@emotion/styled";
import { useHistory,useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Gotch from './Gotch'


export default function CatchPokemon(){
    let { name } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let isCatch = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    const [pokemon, setPokemon] = useState({});

    const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            sprites{
                front_default
            }
        }
    }
    `;

    const { data, error} = useQuery(GET_POKEMON, {
        variables: {
            name: name,
        },
    });

    useEffect(() => {
        if(data){
            setPokemon(data.pokemon);
        }
    }, [data])

    useEffect(() => {
        if(error)
        setIsError(true);
    }, [error])

    useEffect( () => {
        if(pokemon.id !== null){
            setTimeout(
                ()=>{setIsLoading(false)}
            ,5000)
        }
    },[pokemon]);

    if(data === undefined && !isError){
        return (
            <div className={css`height:100vh`+" d-flex align-content-center justify-content-center flex-wrap"}>
                <div>
                    Loading...
                </div>
            </div>
        )
    }
    else if((data && pokemon.id === null) || isError){
        return (
            <div className={css`height:100vh`+" d-flex align-content-center justify-content-center flex-wrap"}>
                <div>
                    Pokemon Not Found
                </div>
            </div>
        )
    }else if(data){
        return(
            isLoading ?
                <PokeballLoading />
            :
                isCatch === 1? 
                    <Gotch pokemonName={pokemon.name} pokemonId={pokemon.id}/>
                :
                    <Failed />
        )
    }
}

function Failed(){
    const history = useHistory();

    return(
        <div className={css`height:100vh; text-align: center`+" d-flex align-content-center justify-content-center flex-wrap"}>
            <div>
                <b>Failed Catch Pokemon</b><br />
                <button className="btn btn-warning" onClick={()=>{history.goBack()}}>Back</button>
            </div>
        </div>
    )
}

function PokeballLoading(){
    const shake = keyframes`
        0% { transform: translate(0, 0) rotate(0deg); }
        30% { transform: translate(-10px, 0) rotate(-20deg); }
        40% { transform: translate(10px, 0) rotate(20deg); }
        60% { transform: translate(-10px, 0) rotate(-20deg); }
        70% { transform: translate(10px, 0) rotate(20deg); }
        100% { transform: translate(0, 0) rotate(0); }
    `
    
    const flash = keyframes`
        from { background: #B0B0B0; }
        to { background: #FF5959; }
    `
    
    const Container = styled.div`
        margin: auto;
        border: 7px solid black;
        height: 150px;
        width: 150px;
        overflow: hidden;
        position: absolute;
        top: calc(50% - 75px);
        left : calc(50% - 75px);
        margin: auto;
        border-radius: 50%;
        background-color: white;
        animation: ${shake} 1s linear 250ms 3 both;
    `
    
    const PokeballTop = styled.div`
        height: 70px;
        background-color: #CC0000;
        position: relative;
        border-bottom: 14px solid black;
    `
    
    const PokeballMiddle = styled.div`
        width: 40px;
        height: 40px;
        margin: auto;
        border: 7px solid black;
        position: absolute;
        left: 48px;
        top: 48px;
        background-color: white;
        border-radius: 50%;
    `
    
    const PokeballMiddleInner = styled.div`
        width: 28px;
        height: 28px;
        background-color: #B0B0B0;
        border-radius : 50%;
        animation: ${flash} 500ms alternate 250ms 8;
    `

    return (
        <Container>
            <PokeballTop />
            <PokeballMiddle>
                <PokeballMiddleInner />
            </PokeballMiddle>
        </Container>
    )
}