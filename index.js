

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start");
    const pokeNameBar = document.querySelector('.pokeName');
    const pokemonPic = document.querySelector('.pokePic');
    const smashButton = document.querySelector('#smash');
    const passButton = document.querySelector('#pass');

    let pokemonPicList = [];
    let pokemonNameList = [];
    let smashList = []
    let passList = []

    function uppercaseFirst (obj) {
        return obj.charAt(0).toUpperCase() + obj.slice(1);
    }
    async function fetchPokemon() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const responseJson = await response.json();
        const responseResults = responseJson.results;


        // Grabs all 151 pokemons default artwork and shoves them into the empty array


        for(let i = 0; i < responseResults.length; i++) {
            const pkm = await fetch(responseResults[i].url)
            const pkmJson = await pkm.json();
            const pkmFrontDefault = pkmJson.sprites.other['official-artwork'].front_default;
            const pkmName = pkmJson.name;
            pokemonPicList.push(pkmFrontDefault);
            pokemonNameList.push(uppercaseFirst(pkmJson.name));
        }

    
        

        // console.log(firstPkmJson.sprites.other.official-artwork.front_default);
    }
    startButton.addEventListener('click', () => {
        pokeNameBar.innerHTML = pokemonNameList[0];
        pokemonPic.src =  pokemonPicList[0];

        //Make the start button dissappear when clicked
        startButton.remove();
        //Make the smash and Pass buttons appear
        smashButton.style.display = 'inline-block';
        passButton.style.display = 'inline-block';
        
    })

    function spliceIt(list) {
        let temporaryName = pokemonNameList.splice(pokemonNameList[1], 1);
        let temporaryPokemon = pokemonPicList.splice(pokemonPicList[1], 1);
        let temporaryConcat = temporaryName.concat(temporaryPokemon)
        list.push(temporaryConcat);

    }

    smashButton.addEventListener('click', () => {
        spliceIt(smashList);
        pokeNameBar.innerHTML = pokemonNameList[0];
        pokemonPic.src =  pokemonPicList[0];
    })

    passButton.addEventListener('click', () => {
        spliceIt(passList);
        pokeNameBar.innerHTML = pokemonNameList[0];
        pokemonPic.src =  pokemonPicList[0];
    })

    function list() {
        console.log(pokemonPicList);
        console.log(pokemonNameList)
        console.log(smashList);
        console.log(passList);
    }

    window.list = list;

    fetchPokemon();


});



