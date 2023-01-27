import Player from './Player'
import styles from '../styles/Home.module.css'

const PlayersList = ({
  players,
  updatePlayer,
  setPlayers,
  setLocalStorage,
}) => {
  if (!players) {
    return null
  }

  return (
    <ul className={styles.playersList}>
      {players.map(player => (
        <Player
          key={player.id}
          player={player}
          updatePlayer={updatePlayer}
          setPlayers={setPlayers}
          setLocalStorage={setLocalStorage}
        />
      ))}
    </ul>
  )
}

export default PlayersList
