

  // 全てのポケモンを取得する定義
  export const getPokemonAll = (url) => {
    return new Promise((resolve,reject) => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
    })
  }


  // ボール出力のためのitemを取得する定義
  export const getItem = (url) => {
    return new Promise((resolve,reject) => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
    })
  }













