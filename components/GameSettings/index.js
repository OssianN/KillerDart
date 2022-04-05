import styles from './gameSettings.module.css'

const index = ({ setPlayers }) => {
  const handleClearStats = () => {
    setPlayers(prev => {
      return prev.map(player => {
        return { ...player, score: 0, number: '', active: false }
      })
    })
  }

  const handleRemoveAll = () => {
    setPlayers([])
  }

  return (
    <section className={styles.container}>
      <button
        className={`${styles.settingsButton} ${styles.clearButton}`}
        onClick={handleClearStats}
      >
        Clear Stats
      </button>
      <button
        className={`${styles.settingsButton} ${styles.removeAllButton}`}
        onClick={handleRemoveAll}
      >
        Remove All
      </button>
    </section>
  )
}

export default index
