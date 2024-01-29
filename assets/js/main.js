const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.querySelector('#viewDetails')

const maxRecords = 151
const limit = 15
let offset = 0;

function convertPokemonToLi(pokemon) {
    const htmlStat = pokemon.stat.map((statItem) => {
        return `<li> 
            ${statItem.stat} : ${statItem.value}
            <div class="progress-bar ${pokemon.type}" style="width: ${statItem.value}%" > </div>
        </li> 
        ` })

    return `
        <li class="pokemon ${pokemon.type}" onclick="showDetails('poke-${pokemon.number}')" id="poke-${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="stats hide">
                <h2> ${pokemon.name} </h2>
                <div>
                    <img src="${pokemon.photo}" alt="Imagem de ${pokemon.name}" >
                </div>
                <ul id="listStats">
                    ${htmlStat.join('\n')}
                </ul>
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

function showDetails(pokeID){
    const pokeItem = document.querySelector(`#${pokeID}`)
    
    document.querySelector('#viewDetails .contentModal').innerHTML = pokeItem.querySelector('.stats').innerHTML
    modal.classList.toggle('hide')
}

document.querySelector('#close-modal').addEventListener('click', (element) => {
    modal.classList.toggle('hide')
    
})

document.addEventListener('scrollend', (event) => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (offset != qtdRecordsWithNexPage){
        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)

        } else { loadPokemonItens(offset, limit) }
    }
})

loadPokemonItens(offset, limit)