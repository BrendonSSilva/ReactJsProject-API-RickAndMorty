import { useState, useEffect } from "react";
import s from './App.module.scss';
import './App.module.scss';
import axios from 'axios'

const App = () => {

  //buscar API
  const [data, setData] = useState({ results: [] })

  const characters = async () => {
    const result = await axios(`https://rickandmortyapi.com/api/character/?page=${page}&name=${theName}&status=${stt}&species=${specie}`)
    setData(result.data)
  }

  //pages
  const [page, setPages] = useState(1)

  const pageUp = () => {
    page < 43 ? setPages(page + 1) : setPages(42)
  }
  const pageDown = () => {
    page > 1 ? setPages(page - 1) : setPages(1)
  }

  //darkMode
  const [dark, setDark] = useState(true)

  const darkMode = () => {
    dark === false ? setDark(true) : setDark(false)
  }

  //pesquisar
  const [theName, setTheName] = useState('')
  const [search, setSearch] = useState('')

  const searchChar = (e: any) => {
    e.preventDefault()
    setSearch(theName)
  }

  //filters

  //status
  const [stt, setStt] = useState('')

  const clickAlive = () => {
    setStt('Alive')
  };
  const clickDead = () => {
    setStt('Dead')
  }
  const clickUnknown = () => {
    setStt('Unknown')
  }
  const clickReset = () => {
    setStt('')
  }

  //espécie
  const [specie, setSpecie] = useState('')

  const clickHuman = () => {
    setSpecie('Human')
  }
  const clickAlien = () => {
    setSpecie('Alien')
  }
  const clickAnimal = () => {
    setSpecie('Animal')
  }
  const clickSpecieReset = () => {
    setSpecie('')
  }

  useEffect(
    () => {
      characters()
    }, [search, stt, specie, page])

  return (
    <div className={dark === false ? s.light : s.dark}>
      <div className={s.filters}>
        {/* pesquisar */}
        <form onSubmit={searchChar}>
          <button type="button" onClick={darkMode} className={s.darkBtn}>{dark === true ? 'Light Mode' : 'Dark Mode'}</button>
          <div>
            <input type="text" value={theName}
              placeholder='Search character'
              onChange={e => setTheName(e.target.value)}
              className={dark === false ? s.light : s.dark} />
            <button type="submit" className={s.btnSearch}>Search</button>
          </div>
        </form>

        {/* status dos personagens */}
        <div className={s.stt}>
          <button type="submit" onClick={clickAlive}>Alive</button>
          <button type="submit" onClick={clickDead}>Dead</button>
          <button type="submit" onClick={clickUnknown}>Unknown</button>
          <button type="submit" onClick={clickReset}>Reset Filters</button>
        </div>

        {/* espécies dos personagens */}
        <div className={s.species}>
          <button type="submit" onClick={clickHuman}>Human</button>
          <button type="submit" onClick={clickAlien}>Alien</button>
          <button type="submit" onClick={clickAnimal}>Animal</button>
          <button type="submit" onClick={clickSpecieReset}>Reset Filters</button>
        </div>
        <div className={s.sttSpc}>
          <p>Status: <strong>{stt}</strong></p>
          <p>Specie: <strong>{specie}</strong></p>
        </div>
      </div>

      {/* cards */}
      <div className={s.card}>
        <div className={s.pages}>
          <button type="button" className={s.btnNext} onClick={pageDown}> Previous</button>
          <button type="button" className={s.btnNext} onClick={pageUp}>Next</button>
        </div>

        <div className={s.dados}>
          <div>{data.results.map((item: any) => (
            <li key={item.id}>
              <img alt={item.name} src={item.image} />
              <span><small>Name:</small> {item.name}</span>
              <span><small>Status:</small> {item.status}</span>
              {/* detalhes extras dos personagens */}
              <details>
                <summary>Detalhes</summary>
                <span><small>Specie:</small> {[item.species]}</span><br />
                <span><small>Gender:</small> {item.gender}</span>
              </details>
            </li>))}
          </div>
        </div>
      </div>
      <footer className={dark === false ? s.light : s.dark} >Projeto (desafio) feito por <a href='https://github.com/BrendonSSilva'>Brendon</a></footer>
    </div>
  )
}

export default App