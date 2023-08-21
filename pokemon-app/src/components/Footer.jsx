import { useEffect, useState } from "react";

function Footer({onPrevClick,onNextClick,dataItem})  {

  const [randomImageUrl, setRandomImageUrl] = useState();


async function random () {
  let randomIndex = Math.floor(Math.random() * dataItem.length);
  let randomItem = dataItem[randomIndex];
  console.log(randomItem.sprites.default);
  setRandomImageUrl(randomItem.sprites.default);
}

useEffect(() => {
  random();
})




  return (
    <div className="fixed z-10 w-full h-16 bottom-10 flex justify-around">
    <button onClick={onPrevClick} className="flex bg-gray-500 md:px-24 px-12 rounded-full font-bold text-lg text-gray-300 hover:bg-gray-300 hover:text-gray-500 duration-500 border-gray-300 border-4 py-6 items-center">
      <img className="w-10 h-10" src={randomImageUrl}/>
      <p className="">戻る</p>
      </button>
    <button onClick={onNextClick} className="flex items-center bg-gray-500 md:px-24 px-12 py-6 rounded-full font-bold text-lg text-gray-300 hover:bg-gray-300 hover:text-gray-500 duration-500 border-gray-300 border-4">
    <img className="w-10 h-10" src={randomImageUrl}/>
      <p>次へ</p>
      </button>
    </div>
  )
}


export default Footer;