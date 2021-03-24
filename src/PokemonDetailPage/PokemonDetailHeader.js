import React, { Fragment } from "react"
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {getPokemonTypeColor} from '../SharedFunction/pokemonFunction'
import PokemonType from '../SharedComponents/PokemonType'

PokemonDetailHeader.propTypes = {
    pokemonTypes: PropTypes.array.isRequired,
    pokemonName: PropTypes.string.isRequired
}

PokemonDetailHeader.defaultProps={
    pokemonName:'',
    pokemonTypes:[{type: {name:'normal'}}]
}

export default function PokemonDetailHeader({pokemonName, pokemonId , pokemonTypes}){
    let pokemonTypeColor = getPokemonTypeColor(pokemonTypes[0].type.name);
    let linkImage = pokemonId ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` : undefined;

    const PokemonDetailHeader = styled.div`
        overflow: hidden;
        position: relative;
    `

    const PokemonDetailHeaderBackground = styled.div`
        width: 200%; 
        height: 100%;
        position: absolute;
        border-radius: 70%;
        bottom: 10%;
        left: -50%;
        background-color: ${pokemonTypeColor} !important;
    `

    const PokeballSvg = styled.svg`
        position:absolute;
        width: 55%;
        fill: rgb(255,255,255,0.5);
        right: 35%;
        @media (min-width: 768px) {
            width: 25%;
            left: 10%;
            top: 15%;
        }
    `


    return (
        <Fragment>
            <PokemonDetailHeader>
                <div className="row">
                    <PokemonDetailHeaderBackground></PokemonDetailHeaderBackground>
                    <PokeballSvg xmlns="http://www.w3.org/2000/svg" className={css`shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;`}
                        viewBox="0 0 928 932">
                        <g id="Layer_x0020_1">
                            <path className="fil0" d="M464 0c243,0 443,186 464,424l-302 0c-18,-72 -84,-125 -162,-125 -78,0 -143,53 -162,125l-302 0c21,-238 221,-424 464,-424zm464 508c-21,238 -221,424 -464,424 -243,0 -443,-186 -464,-424l302 0c19,72 84,125 162,125 78,0 144,-53 162,-125l302 0z"/>
                            <path className="fil0" d="M464 362c58,0 105,46 105,104 0,58 -47,105 -105,105 -58,0 -104,-47 -104,-105 0,-58 46,-104 104,-104z"/>
                        </g>
                    </PokeballSvg>
                    <PokemonDetailHeaderImage linkImage={linkImage}/>
                    <PokemonDetailHeaderInfo 
                        pokemonTypes={pokemonTypes} 
                        pokemonName={pokemonName}/>
                </div>
            </PokemonDetailHeader>
            <PokemonDetailInfo pokemonTypes={pokemonTypes} pokemonName={pokemonName}/>
        </Fragment>
    )
}

function PokemonDetailHeaderImage({linkImage}){
    const PokemonDetailHeaderImage = styled.div`
        width: 70%;
        position: relative;
        z-index: 10;
    `

    const PokemonDetailImage = styled.div`
        width: 70%;
        position: relative;
        z-index: 10;
        min-height: 35vw
    `

    return (
        <PokemonDetailHeaderImage className="col-12 col-md-6 ">
            <PokemonDetailImage className="mx-auto mt-5">
                { linkImage ? <img className={css`width: 100%;`} src={linkImage} alt="" /> : '' }
            </PokemonDetailImage>
        </PokemonDetailHeaderImage>
    )
}

function PokemonDetailHeaderInfo({pokemonTypes, pokemonName}){
    let pokemonNameTitleCase = pokemonName.charAt(0).toUpperCase() + pokemonName.substr(1).toLowerCase();

    const PokemonDetailHeaderInfo = styled.div`
        position: relative;
        @media (max-width: 767px) {
            display: none !important;
        }
    `

    return (
        <PokemonDetailHeaderInfo className="col-12 col-md-6 d-flex align-items-center justify-content-around">
            <div className={css`width: 100%;`}>
                <h1 className={css`font-family: roboto-black; text-align: center; color: white;`}>{pokemonNameTitleCase}</h1>
                <div className={css`width: 100%;`+" d-flex justify-content-center"}>
                    {pokemonTypes.map( (type) => {
                        return <PokemonType key={type.type.name} type={type.type.name} />
                    })}
                </div>
            </div>
        </PokemonDetailHeaderInfo>
    )
}

function PokemonDetailInfo({pokemonTypes, pokemonName}){
    let pokemonNameTitleCase = pokemonName.charAt(0).toUpperCase() + pokemonName.substr(1).toLowerCase();

    const PokemonDetailInfo = styled.div`
        @media (min-width: 768px) {
            display: none !important;
        }
    `

    return (
        <PokemonDetailInfo>
            <h3 className={css`font-family: roboto-black; text-align: center;`}>{pokemonNameTitleCase}</h3>
            <div className={css`width: 100%;`+" d-flex justify-content-center"}>
                {
                    pokemonTypes.map( (type) =>{
                        return <PokemonType key={type.type.name} type={type.type.name} />
                    })
                }
            </div>
        </PokemonDetailInfo>
    )
}
