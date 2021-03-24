import React from "react";
import { css  } from '@emotion/css'
import styled from '@emotion/styled'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'
import Pokeball from './Pokeball'

PokemonCard.propTypes = {
    pokemonId: PropTypes.number.isRequired,
    pokemonName: PropTypes.string.isRequired,
    pokemonImage: PropTypes.string.isRequired,
    pokemonOwned: PropTypes.bool.isRequired
}

PokemonCard.defaultProps={
    pokemonId: "",
    pokemonName: "",
    pokemonOwned: false
}

export default function PokemonCard({pokemonId, pokemonName, pokemonImage, pokemonOwned}){   
    let isOwned = pokemonOwned ? pokemonOwned : false;
    let pokeballColorType = isOwned ? 'red-white' : 'lightgrey';
    
    const PokemonCard = styled.div`
        padding: 0.5rem 0;
    `
    
    const PokemonCardBody = styled.div`
        border-radius: 10px;
        box-shadow: 0 0 10px #ccc;
        position: relative;
        margin: 0px;
        background-color: white;
    `
    
    const PokemonCardImageDiv = styled.div`
        position: relative;
        padding: 0;
        overflow: hidden;
    `
    
    const PokemonCardImage = `
        position: relative;
        z-index: 10;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `    
    
    const PokemonCardData = styled.div`
        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    `
    
    const PokemonCardName = styled.h4`
        padding: 0;
        margin: 0;
    `
    
    const PokemonCardId = styled.small`
        color: gray;
        font-weight: bold;
    `

    return(
        <PokemonCard>
            <PokemonCardBody className="row">
                <PokemonCardImageDiv className="col-5">
                    <Pokeball type={pokeballColorType}/>
                    <LazyLoadImage className={css`${PokemonCardImage}`}
                        alt={pokemonName}
                        src={pokemonImage}
                        height={96}
                        width={96} 
                        effect={"black-and-white"}/>
                </PokemonCardImageDiv>
                <div className={css`padding: 0`+' col-7'}>
                    <PokemonCardData>
                        <PokemonCardName className={css`font-family: roboto-black;`}>{pokemonName}</PokemonCardName>
                        <PokemonCardId>#{pokemonId}</PokemonCardId>
                    </PokemonCardData>
                </div>
            </PokemonCardBody>
        </PokemonCard>
    );
}
