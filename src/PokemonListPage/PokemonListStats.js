import React, { Fragment,useContext } from "react";
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import Pokeball from "../SharedComponents/Pokeball";
import GlobalContext from '../GlobalContext';
import { Callbacks } from "jquery";

export default function PokemonListStats(){
    const {myPokemonContext, pokemonContext} = useContext(GlobalContext)
    const history = useHistory();

    const goToMyPokemonRoute = () =>{ 
        history.push('/my-pokemon');
    }
    return (
        <Fragment>
            <div className={css`margin-top: 130px;`}>
                <div className={ css`height: 30px;`}></div>
                <div className="row mb-4">
                    <StatsNumberBlock statsName='All Species' 
                        statsValue={pokemonContext.data ? pokemonContext.data.count : 0}/>
                    <StatsNumberBlock statsName='Species Owned' 
                        statsValue={myPokemonContext.data ? Object.keys(myPokemonContext.data.data).length : 0}/>
                    <StatsNumberBlock statsName='My Pokemon' 
                        callback={goToMyPokemonRoute}
                        statsValue={myPokemonContext.data ? myPokemonContext.data.count : 0} statsColor='red'/>
                </div>
            </div>
        </Fragment>
    )
}

function StatsNumberBlock({statsColor,statsName,statsValue, callback}){
    const fontColor = statsColor === 'red' ? 'white' : 'black';
    const backgroundColor = statsColor === 'red' ? '#fc5757' : 'lightgrey';
    const pokeballColor = statsColor === 'red' ? 'lightcoral' : 'white';

    const PokemonsIndicator = styled.div`
        position: relative; 
        overflow: hidden; 
        background-color: ${backgroundColor}; 
        color: ${fontColor}; 
        height: 90px; 
        border-radius: 20px; 
        border-color: transparent;
        box-shadow: 0 0 20px #ccc;
        text-align: center;
    `;
    
    const PokemonsIndicatorNumber = styled.h5`
        position: relative; 
        z-index: 10; 
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    `;

    const Name = styled.span`
        margin-top: 5px; 
        font-family: roboto-black;
    `

    const Number = styled.span`
        font-size: 40px;  
        font-weight: lighter;
    `
    
    return (
        <div className="col-6 col-xl-4 mt-4">
            <PokemonsIndicator onClick={() => callback ? callback() : ''}>
                <Pokeball type={pokeballColor} />
                <PokemonsIndicatorNumber className={css`font-size: large;`}>
                    <Name>{statsName}</Name>
                    <br />
                    <Number>{statsValue}</Number>
                </PokemonsIndicatorNumber>
            </PokemonsIndicator>
        </div>
    )
}