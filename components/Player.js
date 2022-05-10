import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import DartContainer from './DartContainer'
import ScoreButton from './ScoreButton'
import styles from '../styles/Home.module.css'

const Player = ({ player, updatePlayer, setPlayers, setLocalStorage }) => {
  const [showRemove, setShowRemove] = useState(false)
  const [animateListItem, setAnimateListItem] = useState(false)

  const setBackgroundOnScore = player => {
    if (player.score === 5) {
      return '#FF4242'
    }

    if (player.score === 0 && player.active) {
      return '#47abd8'
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowRemove(true),
    onSwipedRight: () => setShowRemove(false),
    trackMouse: true,
  })

  const handleRemovePlayer = () => {
    setPlayers(prev => {
      const newList = prev.filter(p => p.id !== player.id)
      setLocalStorage(newList)
      return newList
    })
  }

  useEffect(() => {
    if (player.score === 0 && player.active) {
      updatePlayer(player.id, { isDead: true })
    }

    if (player.score > 0) {
      updatePlayer(player.id, { isDead: false })
    }
  }, [player.score, player.active])

  useEffect(() => {
    console.log(player.isDead)
    if (player.isDead) {
      setAnimateListItem(true)

      setTimeout(() => {
        setAnimateListItem(false)
      }, 600)
    }
  }, [player.isDead])

  return (
    <li
      className={`${styles.playerItem} ${
        animateListItem ? styles.animateListItem : ''
      }`}
      style={{
        background: setBackgroundOnScore(player),
        transform: showRemove ? 'translateX(-250px)' : 'translateX(0)',
        order: player.number * -1,
      }}
      {...handlers}
    >
      <header
        className={styles.playerHeader}
        style={{
          opacity: player.isDead ? 0.3 : 1,
        }}
      >
        <h3 className={styles.playerName}>{player.name}</h3>
        <input
          className={styles.playerTargetInput}
          name="number"
          type="number"
          placeholder="--"
          onChange={e => updatePlayer(player.id, { number: e.target.value })}
          value={player.number}
          min="0"
          max="100"
        />
      </header>
      <div
        className={styles.playersContent}
        style={{
          opacity: player.isDead ? 0.3 : 1,
        }}
      >
        <ScoreButton
          player={player}
          operator={'minus'}
          updatePlayer={updatePlayer}
        />

        <DartContainer playerScore={player.score} />

        <ScoreButton
          player={player}
          operator={'plus'}
          updatePlayer={updatePlayer}
        />
      </div>

      <button
        className={styles.removePlayerButton}
        style={{
          transform: showRemove ? 'translateX(250px)' : 'translateX(300px)',
          opacity: !showRemove ? '0' : '1',
        }}
        onClick={handleRemovePlayer}
      >
        Remove
      </button>
    </li>
  )
}

export default Player
