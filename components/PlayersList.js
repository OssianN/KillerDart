import Player from './Player'
import styles from '../styles/Home.module.css'

const PlayersList = ({ players, setPlayerState }) => {
  return (
    <ul className={styles.playersList}>
      {players
        ?.sort((a, b) => b.number - a.number)
        .map(player => (
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
