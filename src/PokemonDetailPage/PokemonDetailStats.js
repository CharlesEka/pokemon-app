import React, { Fragment } from "react"
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import ContentLoader from '../SharedComponents/ContentLoader'

export default function PokemonDetailStats({pokemonStats}){
    return(
        <Fragment>
            <div className={css`text-align:center; font-size: large;`+' mb-2'}> <b>Stats</b> </div>
            {
                typeof pokemonStats === 'object' ?
                pokemonStats.map(stat => {
                    return <StatBar key={stat.stat.name} statName={stat.stat.name} baseStat={stat.base_stat} />
                }):
                <Fragment>
                    <ContentLoader height={'10px'} />
                    <ContentLoader height={'10px'} />
                    <ContentLoader height={'10px'} />
                    <ContentLoader height={'10px'} />
                    <ContentLoader height={'10px'} />
                </Fragment>
            }
        </Fragment>
    )
}

function StatBar({statName, baseStat}){
    statName = statName === 'special-attack' ? 'Sp.Atk' 
        : statName === 'special-defense' ? 'Sp.Def' 
        : statName.charAt(0).toUpperCase() + statName.substr(1).toLowerCase();
        
    let percentage = Math.round(baseStat*100/180);
    let backgroundColor = '#f34444';

    if(percentage <= 15)
        backgroundColor = '#f34444'
    else if(percentage <=35)
        backgroundColor = '#ff7f0f'
    else if(percentage <=50)
        backgroundColor = '#ffdd57'
    else if(percentage <=65)
        backgroundColor = '#a0e515'
    else if(percentage <=80)
        backgroundColor = '#23cd5e'
    else
        backgroundColor = '#00c2b8'

    const Bar = styled.div`
        width: ${percentage}%; 
        height: 0.75rem; 
        background-color: ${backgroundColor}; 
        border: solid 0.5px lightgrey; 
        border-radius: 10px;
    `

    return (
        <div className="row">
            <div className={css`text-align: right; color: grey; padding-right: 0px`+" col-2"}>
                {statName}
            </div>
            <div className="col-7">
                <Bar className=" mt-1 mb-1"></Bar>
            </div>
            <div className={css`padding-left: 0px; text-align: right;`+" col-3"}>
                <b>{baseStat}</b>/180
            </div>
        </div>
    )
}