function getPokemonTypeColor(type){
    switch (type) {
        case 'fire':
            return 'lightcoral'
        case 'water':
            return 'cornflowerblue'
        case 'grass':
            return 'mediumaquamarine'
        case 'normal':
            return 'rgb(197, 195, 195)'
        case 'fighting':
            return 'indianred'
        case 'flying':
            return 'lightsteelblue'
        case 'ground':
            return 'sandybrown'
        case 'rock':
            return 'rosybrown'
        case 'bug':
            return 'darkseagreen'
        case 'ghost':
            return 'mediumpurple'
        case 'poison':
            return 'mediumpurple'
        case 'steel':
            return 'silver'
        case 'electric':
            return 'burlywood'
        case 'psychic':
            return 'mediumorchid'
        case 'ice':
            return 'lightblue'
        case 'dragon':
            return 'darkslateblue'
        case 'dark':
            return 'darkslategray'
        case 'fairy':
            return 'plum'
        case 'shadow':
            return 'darkslategray'
    
        default:
            return 'rgb(197, 195, 195)';
    }
}

export { getPokemonTypeColor } 