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
    document.body.classList.add('overlay-open');
  };








return (
  <div className='flex flex-wrap md:gap-20 gap-2 w-full justify-center mb-16'>
    {showDetail && <Detail data={selectPokemon} onClose={() => setShowDetail(false)}/>}
{data.map((poke) => (
<div key={poke.id} className='hover:scale-150 duration-300 rounded-xl cursor-pointer flex flex-col'  onClick={() => showDetailHandle(poke)}>
<p className='text-center items-center text-lg font-black'>{poke.jaName}</p>
<img className='w-36 h-36 p-10' src={poke.sprites?.other["dream_world"].front_default} />
</div>
))}
</div>
)
}

export default Card;