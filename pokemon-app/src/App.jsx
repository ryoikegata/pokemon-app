import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [nextPokemonUrl,setNextPokemonUrl] = useState("");
  const [prevPokemonUrl,setPrevPokemonUrl] = useState("");


// 全てのポケモンを取得する定義
  const getPokemonAll = (url) => {
    return new Promise((resolve,reject) => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
    })
  }
  
  // // 一体ずつにポケモンを取得する定義
  // const getPokemon = (url) => {
  //   return new Promise((resolve,reject) => {
  //     fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => resolve(data))
  //   })
  // }



  // それぞれのポケモンを取得する
  const pokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async(pokemon) => {
        let pokemonResult = await getPokemonAll(pokemon.url);
        // ポケモンの名前を日本語にする処理
        let speciesData = await getPokemonAll(pokemonResult.species.url);
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
      setNextPokemonUrl(res.next);
      console.log(res);
      pokemon(res.results);
    }
    
    fetchPokemonData();
  },[],
  );
  
  // 次のページに移動するときの処理
  const nextLoadPage = async () => {
    let data = await getPokemonAll(nextPokemonUrl);
    console.log(data);
    await pokemon(data.results);
    setNextPokemonUrl(data.next);
    setPrevPokemonUrl(data.previous);
    }

    // 前のページに移動するときの処理
    const prevLoadPage = async () => {

        let data = await getPokemonAll(prevPokemonUrl);
        console.log(data);
      await pokemon(data.results);
      setPrevPokemonUrl(data.previous);
    }

  return (
    <>
    <Header/>
    <Card data={pokemonData}/>
    <button onClick={prevLoadPage}>戻る</button>
    <button onClick={nextLoadPage}>クリック</button>
    </>
  );
}


export default App;
