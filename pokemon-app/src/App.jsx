import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  


// 全てのポケモンを取得する定義
  const getPokemonAll = (url) => {
    return new Promise((resolve,reject) => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
    })
  }
  
  // 一体ずつにポケモンを取得する定義
  const getPokemon = (url) => {
    return new Promise((resolve,reject) => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
    })
  }
  
  // それぞれのポケモンを取得する
  const pokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async(pokemon) => {
        let pokemonResult = await getPokemon(pokemon.url);

        // ポケモンの名前を日本語にする処理
        let speciesData = await getPokemon(pokemonResult.species.url);
        let jaName = speciesData.names.find(name => name.language.name === "ja").name;

        return { ...pokemonResult, jaName }
      })
    );
    setPokemonData(_pokemonData);
  }




  useEffect(() => {
    // ポケモンのデータをfetchする
    const fetchPokemonData = async () => {
      let res = await getPokemonAll(pokemonApiUrl);
      pokemon(res.results);
    }
  
    fetchPokemonData();
  },[]);


  return (
    <>
    <Header/>
    <Card data={pokemonData}/>
    </>
  );
}


export default App;
