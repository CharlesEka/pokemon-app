import React, { Fragment,useContext, useEffect, useState } from 'react'
import { css } from '@emotion/css'
import {titleCase} from '../SharedFunction/sentenceFunction'
import ContentLoader from '../SharedComponents/ContentLoader'
import GlobalContext from '../GlobalContext'; 

export default function PokemonDetailStatus({pokemonId,pokemonHeight,pokemonWeight,pokemonabilities}){
    const {myPokemonContext} = useContext(GlobalContext)
    const [owned,setOwned] = useState(0);

    useEffect(() => {
        if(myPokemonContext.data && pokemonId){
            if(pokemonId in myPokemonContext.data.data)
                setOwned(myPokemonContext.data.data[pokemonId].length);
        }
    },[pokemonId,myPokemonContext])

    return (
        <Fragment>
            <div className="text-center">
                <Abilities pokemonabilities={pokemonabilities}/>
            </div>
            <div className="d-flex justify-content-center mx-auto  mt-4" >
                <Status 
                    statusName={'Height'}
                    statusValue={typeof pokemonHeight === 'number' ? `${(Number(pokemonHeight)*0.1).toFixed(2)} M`:null}/>
                <Status 
                    statusName={'Weight'}
                    statusValue={typeof pokemonWeight === 'number' ? `${(Number(pokemonWeight)*0.1).toFixed(2)} Kg`:null}/>
                <Status 
                    statusName={'Owned'}
                    statusValue={typeof pokemonId === 'number' ? owned:null}/>
            </div>
        </Fragment> 
    )
}

function Abilities({pokemonabilities}){
    return (
        <Fragment>
            <b> Abilities </b><br />
                {
                    typeof pokemonabilities === 'object' ?
                    pokemonabilities.map((ability,i) => {
                        let abilityName = titleCase(ability.ability.name);
                        let hidden = ability.is_hidden ? '(hidden ability)' : '';
                        let coma = '';
                        
                        if (i !== 0)
                            coma = ',  ';
                        if(ability.is_hidden)
                            coma = <Fragment>{coma}<br /></Fragment>;
                        
                        return( 
                            <Fragment key={abilityName}>
                                {coma}
                                {abilityName}
                                <small className={css`color: silver`}> {hidden}</small>
                            </Fragment>);
                    }):
                    <ContentLoader height={'10px'}/>
                }
        </Fragment>
    )
}

function Status({statusName, statusValue}){
    return (
        <div className="mr-3 ml-3 text-center">
            <b>{statusName}</b> <br />
            {
                statusValue != null ?
                statusValue:
                <ContentLoader height={'10px'}/>
            }
        </div>
    )
}