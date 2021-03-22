import React from "react";
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import PropTypes from 'prop-types'
import PokeballComponent from '../SharedComponents/PokeballComponent'

PokemonListItem.propTypes = {
    pokemonId: PropTypes.number.isRequired,
    pokemonName: PropTypes.string.isRequired,
    pokemonImage: PropTypes.string.isRequired
}

export default function PokemonListItem({pokemonId, pokemonName, pokemonImage}){    
    let pokemonNameTitleCase = pokemonName.charAt(0).toUpperCase() + pokemonName.substr(1).toLowerCase();
    let isOwned = false;
    let pokeballColorType = isOwned ? 'red-white' : 'lightgrey';
    
    const PokemonCard = styled.div`
        padding: 0;
        padding: 0.5rem;
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
        <PokemonCard className="col-xl-3 col-lg-4 col-sm-6 col-12" key={pokemonId}>
            <PokemonCardBody className="row">
                <PokemonCardImageDiv className="col-5">
                    <PokeballComponent type={pokeballColorType}/>
                    <LazyLoadImage className={css`${PokemonCardImage}`}
                        alt={pokemonName}
                        src={pokemonImage}
                        height={96}
                        width={96} 
                        effect={"black-and-white"}/>
                </PokemonCardImageDiv>
                <div className={css`padding: 0`+' col-7'}>
                    <PokemonCardData>
                        <PokemonCardName className={css`font-family: roboto-black;`}>{pokemonNameTitleCase}</PokemonCardName>
                        <PokemonCardId>#{pokemonId}</PokemonCardId>
                    </PokemonCardData>
                </div>
            </PokemonCardBody>
        </PokemonCard>
    );
}