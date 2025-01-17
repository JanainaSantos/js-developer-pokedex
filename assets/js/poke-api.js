
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertToPokemonDetails(pokeDetail) {
    console.log(pokeDetail);
    const pokemon = new PokemonDetails()
    
    pokemon.species = pokeDetail.species.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    //pokemon.abilities = [];
    //pokemon.gender;
    //pokemon.hp;
    //pokemon.attack
    //pokemon.defense;
    //pokemon.spAtk;
    //pokemon.spDef;
    //pokemon.speed;
    //pokemon.total;
    
    return pokemon
}

pokeApi.getPokemonsListDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsListDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = (id = 0 ) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    
    return fetch(url)
    .then((response) => response.json())
    .then(convertToPokemonDetails)
}