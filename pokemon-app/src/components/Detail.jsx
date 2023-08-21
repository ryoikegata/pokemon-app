import React, { useEffect, useState } from 'react';



function Detail({ data,onClose}) {



  const [pokemonType, setPokemonType] = useState([]);




  const _pokemonType = async (types) => {
    let _pokemonType = await Promise.all(
      types.map(async (type) => {
        const response = await fetch(type);
        const typeData = await response.json();
        console.log(typeData.names);
        let jaName = typeData.names.find(name => name.language.name === "ja").name;
        return jaName
      })
    )
    setPokemonType(_pokemonType);
  }


  useEffect(() => {
    const resTypes = data.types.map(v => v.type.url);
    _pokemonType(resTypes);
    console.log(resTypes);
  }, [data.types]);




  return (
    <>
    <div className='fixed md:h-3/5 h-3/6 w-3/5  bg-gray-300 z-10 rounded-3xl border-gray-500 border-8'>
      <div className='text-center'>
        <div className='flex justify-center mt-4'>
        <img className=' md:w-56 md:h-56 w-36 h-36 ' src={data.sprites?.other["dream_world"].front_default}/>
        </div>
        <div className='mt-4 flex font-bold md:text-2xl  justify-center gap-5 '>
          <label htmlFor="" >なまえ：</label>
      <p>{data.jaName}</p>
      </div>
      <div className='flex justify-center gap-5 font-bold md:text-2xl mt-5'>
        <label htmlFor="">タイプ：</label>
      <p>{pokemonType.join('　　')}</p>
      </div>
      <div className='flex justify-center gap-5 font-bold md:text-2xl mt-5'>
        <label htmlFor="">体重：</label>
      <p>{data.weight}kg</p>
      </div>
      </div>
      <div className='flex justify-center md:mt-5 mt-10 md:mt-20'>
    <button onClick={onClose} className='bg-gray-500 md:px-24 px-12 py-2 rounded-full font-bold  text-gray-300 hover:bg-red-500 duration-500'>閉じる</button>
    </div>
    </div>
    </>
  )
}












export default Detail;