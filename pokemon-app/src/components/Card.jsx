import React from 'react';


function Card  ({data})   {

return (
<div className='flex flex-wrap gap-20 w-full justify-center'>
{data.map((poke) => (
<div key={poke.id} className='bg-blue-300 shadow-xl rounded-xl cursor-pointer'>
<p className='text-center items-center text-2xl font-black'>{poke.jaName}</p>
<img className='w-80 h-80 p-10' src={poke.sprites?.other["dream_world"].front_default} />
</div>
))}
</div>
)
}

export default Card;