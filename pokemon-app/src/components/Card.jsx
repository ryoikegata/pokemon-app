import React from 'react';
import { useEffect, useState } from "react";
import Detail from './Detail';

function Card  ({data})   {
  const [selectPokemon, setSelectPokemon] = useState();
  const [showDetail, setShowDetail] = useState(false);

  const showDetailHandle = (poke) => {
    console.log(poke.id);
    setSelectPokemon(poke);
    setShowDetail(true);
  };








return (
  <div className='flex flex-wrap gap-20 w-full justify-center'>
    {showDetail && <Detail data={selectPokemon} onClose={() => setShowDetail(false)} />}
{data.map((poke) => (
<div key={poke.id} className='bg-blue-300 shadow-xl rounded-xl cursor-pointer flex flex-col'  onClick={() => showDetailHandle(poke)}>
<p className='text-center items-center text-2xl font-black'>{poke.jaName}</p>
<img className='w-36 h-36 p-10' src={poke.sprites?.other["dream_world"].front_default} />
</div>
))}
</div>
)
}

export default Card;