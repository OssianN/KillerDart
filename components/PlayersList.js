import Player from './Player'
import styles from '../styles/Home.module.css'

const PlayersList = ({ players, setPlayerState }) => {
  if (!players) {
    return <></>
  }

  return (
    <ul className={styles.playersList}>
      {players.map(player => (
        <Player
          key={player.id}
          player={player}
          setPlayerState={setPlayerState}
        />
      ))}
    </ul>
  )
}

export default PlayersList
