import { useState, useEffect } from 'react'
import GameSettings from '../components/GameSettings'
import Form from '../components/Form'
import PlayersList from '../components/PlayersList'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [players, setPlayers] = useState([])

  const setLocalStorage = players => {
    localStorage.setItem('players', JSON.stringify(players))
  }

  useEffect(() => {
    const storage = localStorage.getItem('players')
    const localList = JSON.parse(storage)

    if (storage) {
      setPlayers(localList)
    }
  }, [])

  const handlePlayerActive = player => {
    if (player.score > 0) {
      player.active = true
    }
  }

  const setPlayerState = (id, value) => {
    const newList = players.map(player => {
      handlePlayerActive(player)
      return player.id === Number(id) ? { ...player, ...value } : player
    })

    setPlayers(newList)
    setLocalStorage(newList)
  }

  return (
    <main className={styles.container}>
      <PlayersList players={players} setPlayerState={setPlayerState} />
      <Form setPlayers={setPlayers} setLocalStorage={setLocalStorage} />
      <GameSettings setPlayers={setPlayers} />
    </main>
  )
}

export default Home
