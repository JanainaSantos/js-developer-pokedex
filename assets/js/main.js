const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const openModalImg = document.getElementById('openModalImg')
const modalDetails = document.getElementById('modalDetails');
const backdrop = document.getElementById('modalBackdrop')
const detailsPokemon = document.getElementById('detailsPokemon')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img onclick="open(${pokemon.number})"  id="openModalImg" class="pokemon-photo" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokemonToDetails(pokemon) {
    return `                      
               
        <span class="pokemon-number">#001</span>
        <span class="pokemon-name">Bulbasaur</span>
        
        <div class="container-details">
            <ol class="pokemon-types">
                <li class="pokemon-type">grass</li>
                <li class="pokemon-type">Poison</li>
            </ol>

            <img  class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                    alt="bulbasaur">
        </div>
        <div class="detail-list">
            <div class="container-about-pokemon">
                <p class="about-pokemon">About</p>
            </div>
        </div>
    `;
}

function loadPokemon(id) {
    pokeApi.getPokemonById(id).then((pokemon) => {
        const newHtml = convertPokemonToDetails(pokemon)
        detailsPokemon.innerHTML += newHtml
    })
}

function open(id){
    modalDetails.style.display = 'block';
    backdrop.style.display ='block';
    this.loadPokemon(id);
}

function close(){
    modalDetails.style.display = 'none';
    backdrop.style.display= 'none';
}