import React, { Fragment } from "react";
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import PokeballComponent from "../SharedComponents/PokeballComponent";

export default function PokemonListStats(){
    return (
        <Fragment>
            <div className={css`margin-top: 130px;`}>
                <div className={ css`height: 30px;`}></div>
                <div className="row mb-4">
                    <StatsNumberBlock statsName='All Species' statsValaue='100' statsColor=''/>
                    <StatsNumberBlock statsName='Species Owned' statsValaue='100' statsColor=''/>
                    <StatsNumberBlock statsName='My Pokemon' statsValaue='100' statsColor='red'/>
                </div>
            </div>
        </Fragment>
    )
}

function StatsNumberBlock(props){
    const fontColor = props.statsColor === 'red' ? 'white' : 'black';
    const backgroundColor = props.statsColor === 'red' ? '#fc5757' : 'lightgrey';
    const pokeballColor = props.statsColor === 'red' ? 'lightcoral' : 'white';

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
            <PokemonsIndicator>
                <PokeballComponent type={pokeballColor} />
                <PokemonsIndicatorNumber className={css`font-size: large;`}>
                    <Name>{props.statsName}</Name>
                    <br />
                    <Number>100</Number>
                </PokemonsIndicatorNumber>
            </PokemonsIndicator>
        </div>
    )
}