import Localbase from 'localbase'

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

// function addPokemon(){
    // let promise = new Promise( (resolve,reject) => {
    //     let db = new Localbase('db')
    //     db.collection('myPokemon').add({
    //         pokemonId: pokemon.pokemonId,
    //         pokemonName: pokemon.pokemonName,
    //         pokemonCustomName : pokemon.pokemonCustomName
    //     })
    //     if(messageStatus.ok)
    //         resolve(messageStatus);
    //     else
    //         reject(messageStatus);
    // });
    // return promise;
// }

export async function getAllPokemonGroupByKey(){
    let db = new Localbase('db')
    let result = {};
    
    await db.collection('myPokemon').get().then(
        pokemons =>{
            result.data = groupBy(pokemons,'pokemonId');
            result.count = pokemons.length;
        }
    );

    return result;
} 

// function getPokemon(pokemonId){

// }


export function addDummy(){
    let db = new Localbase('db')

    db.collection('myPokemon').add({
    pokemonId: 2,
    pokemonName: "ivysaur",
    pokemonCustomName : "Ivysaur 1"
});

db.collection('myPokemon').add({
    pokemonId: 2,
    pokemonName: "ivysaur",
    pokemonCustomName : "Ivysaur 2"
});

db.collection('myPokemon').add({
    pokemonId: 2,
    pokemonName: "ivysaur",
    pokemonCustomName : "Ivysaur 3"
});

db.collection('myPokemon').add({
    pokemonId: 10,
    pokemonName: "caterpie",
    pokemonCustomName : "Caterpie 1"
});

db.collection('myPokemon').add({
    pokemonId: 17,
    pokemonName: "pidgeotto",
    pokemonCustomName : "Pidgeotto 3"
});}