import React, { Fragment } from "react"
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

PokeballComponent.propTypes = {
    type: PropTypes.oneOf(['lightcoral', 'lightgrey', 'white', 'red-white']).isRequired
}

PokeballComponent.defaultProps={
    type:'lightgrey'
}

export default function PokeballComponent({type}){
    let upperColor = null;
    let lowerColor = null;

    switch (type) {
        case 'lightcoral':
            upperColor = 'lightcoral';
            lowerColor = 'lightcoral'
            break;
        case 'white':
            upperColor = 'white';
            lowerColor = 'white'
            break;
        case 'lightgrey':
            upperColor = 'lightgrey';
            lowerColor = 'lightgrey'
            break;
        case 'red-white':
            upperColor = '#fb6c6c';
            lowerColor = '#f0f0f0'
            break;
        default:
            upperColor = '#f0f0f0';
            lowerColor = '#f0f0f0'
        break
    }
    
    
    const Pokeball = styled.div`
            width: 100px;
            height: 100px;
            position: absolute;
            left: calc(25% - 50px);
            top: calc(50% - 50px);
            transform: rotate(325deg);
        `

    const PokeballUpper = styled.div`
            width: 100%;
            position: absolute;
            height: calc(50% - 5px);
            overflow: hidden;
            top: 0;
            border-radius: 121.6px 121.6px 0 0;
            border-bottom: 0;
            margin-bottom: -5px;
        `
    
    const PokeballUpperInner = styled.div`
        width: 100px;
        height: 50px;
        border: 32px solid ${upperColor};
        border-radius: 121.6px 121.6px 0 0;
        border-bottom: 0;
        margin-bottom: -5px;
    `

    const PokeballMiddle = styled.div`
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: ${lowerColor};
        position: absolute;
        left: calc(50% - 13px);
        top: calc(50% - 13px);
    `

    const PokeballLower = styled.div`
            width: 100%;
            position: absolute;
            height: calc(50% - 5px);
            overflow: hidden;
            bottom: 0;
        `

    const PokeballLowerInner = styled.div`
        width: 100px;
        height: 50px;
        border: 32px solid ${lowerColor};
        margin-top: -5px;
        border-radius: 0 0 121.6px 121.6px;
        border-top: 0;
    `
    
        return (
        <Fragment>
            <Pokeball>
                <PokeballUpper>
                    <PokeballUpperInner />
                </PokeballUpper>
                <PokeballMiddle />
                <PokeballLower>
                    <PokeballLowerInner />
                </PokeballLower>
            </Pokeball>
        </Fragment>
    )
}