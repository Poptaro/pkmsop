
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("button").addEventListener('click', getPokemon)
    var counter = 1


    function getPokemon() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET','https://pokeapi.co/api/v2/pokemon?limit=151', true);
    
        let listPkm = '';

        xhr.onload = function () {
            if(this.status == 200) {
                var pokemon = JSON.parse(this.responseText);
                for(let i in pokemon.results){
                    let results = pokemon.results[i];   
                    console.log(results.name);           
  
                    // listPkm -=`<li>${results.name}</li>`
                }

                // document.getElementById('lista').innerHTML = listPkm;
            }
        }
        xhr.send();
        
    }
});
