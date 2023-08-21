import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import { getPokemonAll, getItem } from './utils/ApiFetch';

function App() {
  const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const itemUrl = " https://pokeapi.co/api/v2/item/";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPokemonUrl,setNextPokemonUrl] = useState("");
  const [prevPokemonUrl,setPrevPokemonUrl] = useState("");
  const [itemData, setItemData] = useState([]);
  



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

    // itemを取得する
    const item = async (data) => {
      let _itemData = await Promise.all(
        data.map(async(item) => {
          let itemResult = await getItem(item.url);
          return itemResult;
        })
      )
      setItemData(_itemData);
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

  useEffect(() => {
    // itemのデータをfetchする
    const fetchItemData = async () => {
      let res = await getItem(itemUrl);
      console.log(res);
      item(res.results);
    }
    fetchItemData();
  },[],)

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
    <div className='bg-gradient-to-r from-green-200 to-green-500 overflow-hidden'>
    <Header/>
    <Card data={pokemonData}/>
    <Footer onPrevClick={prevLoadPage} onNextClick={nextLoadPage} dataItem={itemData}/>
    </div>
  );
}


export default App;
