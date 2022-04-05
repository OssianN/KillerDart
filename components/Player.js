import DartSvg from './DartSvg'
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

    const score =
      e.target.name === 'minus'
        ? changeScore(player.score - 1)
        : changeScore(player.score + 1)
    setPlayerState(player.id, { score })

    e.target.classList.add(styles.animateScoreButton)
    setTimeout(() => {
      e.target.classList.remove(styles.animateScoreButton)
    }, 300)
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
              <div className={styles.dartImageContainer} key={i}>
                <DartSvg
                  className={styles.dartImage}
                  style={{
                    opacity: player.score <= i ? 0.2 : 1,
                    transform:
                      player.score > i
                        ? 'translateY(10px) translateX(-10px)'
                        : '',
                  }}
                />
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
