

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const pokeNameBar = document.querySelector('.pokeName');
    const pokemonPic = document.querySelector('.pokePic');
    const smashButton = document.querySelector('#smash');
    const passButton = document.querySelector('#pass');
    const smashList = document.querySelector('.smashList');
    const mainGame = document.querySelector('.mainGame');
    const mainBody = document.querySelector('.mainBody');
    const realBody = document.querySelector('.realBody');
    


    let pokemonJsonList = []
    let pokemonPicList = [];
    let pokemonNameList = [];
    let smashArray = []
    let passArray = []

    //choose how many pokemon to pull from the api starting with bulbasaur(1)
    const amountToRetrieve = 6;

    //Function to convert the all lowercase basic json information into regular Capitlized beginning words
    function uppercaseFirst (obj) {
        return obj.charAt(0).toUpperCase() + obj.slice(1);
    }

    //This function checks to see if there are any items left inside pokemonJsonList.
    //If there are items, continue portaying the name and picture
    //If NO items, nothing should happen and the [results] function should proc next
    function pokemonFiller () {
        if(pokemonJsonList.length === 0){
            pokeNameBar.innerHTML = ''
            pokemonPic.src =  ''
        } else {
            pokeNameBar.innerHTML = pokemonNameList[0];
            pokemonPic.src =  pokemonPicList[0];
        }

    }

    //fucking wild west bullshit right here. it works and thats all that matters.
    function spliceIt(list) {
        let temporaryName = pokemonNameList.splice(pokemonNameList[1], 1);
        let temporaryPokemon = pokemonPicList.splice(pokemonPicList[1], 1);
        let temporaryConcat = temporaryName.concat(temporaryPokemon)
        list.push(temporaryConcat);
        pokemonJsonList.shift()
    }
    
    //Whenever pokemonJsonList becomes 0, remove everything that links to the main game
    function results() {
        if(pokemonJsonList.length === 0){
            mainBody.remove()
        }
        
    }

    //This procs everytime the smassh or pass buttons are pressed. when the condition is true, it will start the results
    function resultScreen(smash, pass) {
        if(amountToRetrieve == (smashArray.length + passArray.length)) {
            realBody.innerHTML += `
                <div class="resultParent">
                    <div class="smashList">
                        <p class="smashpassTitle">SMASH</p>
                        <ul class="smashUL">
                        </ul>
                    </div>

                    <div class="passList">
                        <p class="smashpassTitle">PASS</p>
                        <ul class="passUL">
                        </ul>
                    </div>
                </div>
                `
            for(let i = 0;i < smashArray.length;i++){
                const smashUL = document.querySelector('.smashUL');
                smashUL.innerHTML += `
                    <li>
                        <img src='${smashArray[i][1]}' width='50' height='50'>
                        ${smashArray[i][0]}
                    </li>
                `
            }
            
            for(let i = 0;i < passArray.length;i++){
                const passUL = document.querySelector('.passUL');
                passUL.innerHTML += `
                    <li>
                        <img src='${passArray[i][1]}' width='50' height='50'>
                        ${passArray[i][0]}
                    </li>
                `
            }
            
                    
            
        }
    }

    async function fetchPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amountToRetrieve}`);
        const responseJson = await response.json();
        const responseResults = responseJson.results;


        // Grabs all 151 pokemons default artwork and shoves them into the empty array


        for(let i = 0; i < responseResults.length; i++) {
            const pkm = await fetch(responseResults[i].url)
            const pkmJson = await pkm.json();
            pokemonJsonList.push(pkmJson.id);
            const pkmFrontDefault = pkmJson.sprites.other['official-artwork'].front_default;
            const pkmName = pkmJson.name;
            pokemonPicList.push(pkmFrontDefault);
            pokemonNameList.push(uppercaseFirst(pkmName));
        }
    }

    fetchPokemon();


    startButton.addEventListener('click', () => {
        pokeNameBar.innerHTML = pokemonNameList[0];
        pokemonPic.src =  pokemonPicList[0];
        //Make the start button dissappear when clicked
        startButton.remove();
        //Make the smash and Pass buttons appear
        smashButton.style.display = 'inline-block';
        passButton.style.display = 'inline-block';
        
    })

////Main two buttons of the game
////////////////////////////////////////////////////////////////////////////

    smashButton.addEventListener('click', () => {
        if (pokemonJsonList.length === 1) {
            spliceIt(smashArray);
            pokemonFiller();
            results();
        } else {
            spliceIt(smashArray);
            pokemonFiller();
            results();
        }

        resultScreen(smashArray, passArray);
        
    })

    passButton.addEventListener('click', () => {
        if (pokemonJsonList.length === 1) {
            spliceIt(passArray);
            pokemonFiller();
            results();
        } else {
            spliceIt(passArray);
            pokemonFiller();
            results();
        }

        resultScreen(smashArray, passArray);
    })

////////////////////////////////////////////////////////////////////////////  

    function list() {
        console.log(pokemonPicList);
        console.log(pokemonNameList)
        console.log(smashArray);
        console.log(passArray);
        console.log(pokemonJsonList)
        console.log(smashArray.length + passArray.length == amountToRetrieve);
    }
    

    window.list = list;
    


});


//what the fuck


