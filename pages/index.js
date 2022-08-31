import { useState, useEffect } from 'react'
import GameSettings from '../components/GameSettings'
import Form from '../components/Form'
import PlayersList from '../components/PlayersList'
import styles from '../styles/Home.module.css'

const resetPlayerStats = players =>
  players.map(player => ({
    ...player,
    score: 0,
    number: '',
    active: false,
    isDead: false,
  }))

const Home = () => {
  const [players, setPlayers] = useState([])

  const setLocalStorage = players => {
    localStorage.setItem('players', JSON.stringify(players))
  }

  const handleClearStats = () => {
    const newList = resetPlayerStats(players)

    setLocalStorage(newList)
    setPlayers(newList)
  }

  const handleRemoveAll = () => {
    setLocalStorage([])
    setPlayers([])
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const localList = JSON.parse(localStorage.getItem('players')) ?? []
    setPlayers(localList)
  }, [])

  const handlePlayerActive = player => {
    if (player.score > 0) {
      player.active = true
    }
  }

  const updatePlayer = (id, value) => {
    const newList = players.map(player => {
      handlePlayerActive(player)
      return player.id === Number(id) ? { ...player, ...value } : player
    })

    setPlayers(newList)
    setLocalStorage(newList)
  }

  return (
    <main className={styles.container}>
      <GameSettings
        handleClearStats={handleClearStats}
        handleRemoveAll={handleRemoveAll}
      />
      <PlayersList
        players={players}
        updatePlayer={updatePlayer}
        setPlayers={setPlayers}
        setLocalStorage={setLocalStorage}
      />
      <Form setPlayers={setPlayers} setLocalStorage={setLocalStorage} />
    </main>
  )
}

export default Home
