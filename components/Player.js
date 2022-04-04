import Image from 'next/image'
import dart from '../dart.png'
import styles from '../styles/Home.module.css'

const Player = ({ player, setPlayerState }) => {
  const changeScore = newValue => {
    if (newValue > 5) {
      return 5
    }

    if (newValue < 0) {
      player.active = true
      return 0
    }

    return newValue
  }

  const setBackgroundOnScore = player => {
    if (player.score === 5) {
      return '#FF4242'
    }

    if (player.score === 0 && player.active) {
      return '#47abd8'
    }
  }

  const handleScoreChange = e => {
    e.stopPropagation()

    if (e.target.name === 'minus') {
      setPlayerState(player.id, { score: changeScore(player.score - 1) })
    }

    if (e.target.name === 'plus') {
      setPlayerState(player.id, { score: changeScore(player.score + 1) })
    }
  }

  return (
    <li
      className={styles.playerItem}
      style={{ background: setBackgroundOnScore(player) }}
    >
      <header className={styles.playerHeader}>
        <h3 className={styles.playerName}>{player.name}</h3>
        <input
          className={styles.playerTargetInput}
          name="number"
          onChange={e => setPlayerState(player.id, { number: e.target.value })}
          value={player.number}
          type="number"
        />
      </header>
      <div className={styles.playersContent}>
        <button
          className={styles.scoreButton}
          name="minus"
          onClick={handleScoreChange}
        >
          <span className={styles.scoreButtonSpan}></span>
        </button>

        <div className={styles.dartContainer}>
          {new Array(5).fill(0).map((_, i) => {
            return (
              <div
                className={`${styles.dartImageContainer} ${
                  player.score - 1 === i ? styles.dartImageAnimation : ''
                }`}
                key={i}
              >
                {player.score > i && (
                  <Image
                    className={styles.dartImage}
                    layout="fill"
                    // style={{ opacity: player.score <= i ? 0.1 : 1 }}
                    src={dart}
                    alt="dart"
                  />
                )}
              </div>
            )
          })}
        </div>
        <button
          className={styles.scoreButton}
          name="plus"
          onClick={handleScoreChange}
        >
          <span className={styles.scoreButtonSpan}></span>
          <span className={styles.scoreButtonSpan}></span>
        </button>
      </div>
    </li>
  )
}

export default Player
