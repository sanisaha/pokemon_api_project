const search_name = document.getElementById('search_name')

const generations = [
    {limit: 151, offset: 0},
    {limit: 100, offset: 151},
    {limit: 135, offset: 251},
    {limit: 107, offset: 386},
    {limit: 156, offset: 493},
    {limit: 72, offset: 649},
    {limit: 88, offset: 721},
    {limit: 96, offset: 809},
    {limit: 3, offset: 905}
]
const btn = document.querySelectorAll('button');
for (const item of btn){
    
    item.addEventListener('click', function getGeneration()
       { for (const item of btn){
            item.style.backgroundColor = 'cornflowerblue'}
        const limitOffset = generations[parseInt(item.value) - 1];
        item.style.backgroundColor = 'yellow';
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitOffset.limit}&offset=${limitOffset.offset}/`)
        .then(res => res.json())
.then(data => {
    const fetches = data.results.map(item => {
        return fetch(item.url).then(res => res.json())
    })
    Promise.all(fetches).then(res => pokemonCard(res))
})
    })
}

function pokemonCard (data) {
    document.querySelector('.pokemon_box')
        .innerHTML = data.map((item) => 
         { return `
        <div class = 'card'>
        
        <img src='${item.sprites.other.dream_world.front_default}'></img>
        <div class = 'card_text'>
        <p>${item.name}</p>
        <img class = '${item.types[0].type.name}' 
        src='icons/${item.types[0].type.name}.svg'/>
        <img class = '${item.types[1]?.type.name}' 
        src='icons/${item.types[1]?.type.name}.svg'/>
        <img class = '${item.types[2]?.type.name}' 
        src='icons/${item.types[2]?.type.name}.svg'/>
        </div>
        </div>
        `
        }).join('')

}

function pokemonTypeCard (data) {
    const fetches = data.pokemon.map(item => {
        return fetch(item.pokemon.url).then(res => res.json())
    })
    Promise.all(fetches).then(res => pokemonCard(res))
   }
function showPokemon (data) {
    document.querySelector('.pokemon_box')
        .innerHTML = 
         `
        <div class = 'card'>
        <p>${data.types[0].type.name}</p>
        <img src='${data.sprites.other.dream_world.front_default}'></img>
        <p>${data.name}</p>
        </div>
        `


}

function searchPokemon (){
fetch(`https://pokeapi.co/api/v2/pokemon/${search_name.value}`)
.then(res => res.json())
.then(data => showPokemon(data))
}

function showTypes () {
    fetch(`https://pokeapi.co/api/v2/type/${event.target.className}`)
.then(res => res.json())
.then(data => {
    pokemonTypeCard(data);
})
}

