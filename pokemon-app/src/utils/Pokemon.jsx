import { useEffect, useState } from "react";

function Pokemon () {

const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
const [pokemonData, setPokemonData] = useState([]);


const getPokemonAll = (url) => {
  return new Promise((resolve,reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data))
  })
}

const getPokemon = (url) => {
  return new Promise((resolve,reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data))
  })
}

const pokemon = async (data) => {
  let _pokemonData = await Promise.all(
    data.map((pokemon) => {
      let pokemonResult = getPokemon(pokemon.url);
      return pokemonResult;
    })
  );
  setPokemonData(_pokemonData);
}



useEffect(() => {
  const fetchPokemonData = async () => {
    let res = await getPokemonAll(pokemonApiUrl);
    pokemon(res.results);
  }

  fetchPokemonData();
},[]);


return (
  <>
        </>
)

}

export default Pokemon;