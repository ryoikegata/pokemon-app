import React from 'react';



function Detail({ data,onClose}) {

  console.log(data);




  return (
    <>
    <div className='fixed'>
      <p>{data.jaName}</p>
    <button onClick={onClose}>閉じる</button>
    </div>
    </>
  )
}












export default Detail;