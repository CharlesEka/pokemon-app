import React, { Fragment } from 'react';
import { css } from '@emotion/css'
import {titleCase} from '../SharedFunction/sentenceFunction'
import styled from '@emotion/styled';
import ContentLoader from '../SharedComponents/ContentLoader'

export default function PokemonDetailMoves({pokemonMoves}){
    const Move = styled.div`
        border: solid 1px grey;
        margin: 5px 5px;
        padding: 5px 10px;
        border-radius: 10px
    `
    return(
        <Fragment>
            <div className={css`text-align:center; font-size: large;`+' mb-2'}> <b>Moves</b> </div>
            <div className='container d-flex justify-content-around flex-wrap'>
                {
                    typeof pokemonMoves === 'object' ?
                    pokemonMoves.map(move => {
                        return (
                            <Move key={move.move.name}>
                                {titleCase(move.move.name)}
                            </Move>
                        );
                    }):
                    <ContentLoader height={'10px'}/>
                }
            </div>
        </Fragment>
    );
}