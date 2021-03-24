import Localbase from 'localbase'
import { func } from 'prop-types';

export async function getAllPokemonGroupByKey(){
    let db = new Localbase('db');
    db.config.debug = false;
    
    let result = {};
    
    await db.collection('myPokemon').get().then(
        pokemons =>{
            result.data = groupBy(pokemons,'pokemonId');
            result.count = pokemons.length;
        }
    );

    return result;
}

export async function releasePokemon(pokemonId,pokemonCustomName){
    let db = new Localbase('db');
    await db.collection('myPokemon').doc({ pokemonId: pokemonId, pokemonCustomName: pokemonCustomName }).delete()
}

export function addPokemon(pokemonId,pokemonName,pokemonCustomName){
    let promise = new Promise( (resolve,reject) => {
        let db = new Localbase('db')
        isPokemonCustomNameUnique(pokemonId,pokemonCustomName).then(
            async isUnique => {
                if(isUnique){
                    await db.collection('myPokemon').add({
                        pokemonId: pokemonId,
                        pokemonName: pokemonName,
                        pokemonCustomName : pokemonCustomName
                    })
        
                    resolve(`${pokemonName} is obtained`);
                }else{
                    reject(`the name has been taken by another ${pokemonName}`);
                }
            }
        ).catch(
            e => reject(`look like something went wrong`)
        );
    });
    return promise;
}

async function isPokemonCustomNameUnique(pokemonId,pokemonCustomName){
    let db = new Localbase('db');
    db.config.debug = false;
    
    let result = false;
    
    await db.collection('myPokemon').doc({ pokemonId: pokemonId, pokemonCustomName: pokemonCustomName }).get().then(
        pokemon =>{
            result = pokemon ? false : true;
        }
    );

    return result;
}

function groupBy(objectArray, property) {
    let list = [];
    objectArray.map((obj) => {
        const key = obj[property];
        if (!list[key]) {
            list[key] = [];
        }
       // Add object to list for given key's value
        list[key].push(obj);
    },  {});
    return list;
}