import React, { useState, useContext, Fragment }  from "react"
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css'
import { addPokemon } from '../SharedFunction/pokemonLocalDB'
import GlobalContext from '../GlobalContext';


export default function Gotch({pokemonName,pokemonId}){
    const {myPokemonContext} = useContext(GlobalContext)
    const [pokemonCustomeName, setPokemonCustomeName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    function addPokemonHandle(){
        setIsLoading(true);
        setError('');
        addPokemon(pokemonId,pokemonName,pokemonCustomeName).then(
            message => {
                myPokemonContext.refreshMyPokemon();
                history.goBack();
            }
        ).catch( e =>{
                setIsLoading(false);
                setError(e);
            }
        )
    }

    return (<div className={css`height:100vh; text-align: center`+" d-flex align-content-center justify-content-center flex-wrap"}>
        <div>
            <b>Gotch</b><br />
            give "{pokemonName}" a name
    
            {error !== '' ? <Fragment> <br /><small className={css`color: red`}>{error}</small></Fragment> : ''}

            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder={pokemonName} 
                    onChange={event => setPokemonCustomeName(event.target.value)}/>
                <button 
                    className="btn btn-warning" 
                    type="button" 
                    onClick={()=>addPokemonHandle()}
                    disabled={isLoading}
                >OK</button>
            </div>
        </div>
    </div>)
}