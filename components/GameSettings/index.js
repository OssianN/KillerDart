import styles from './gameSettings.module.css'

const index = ({ setPlayers }) => {
  const handleClearStats = () => {
    setPlayers(prev => {
      return prev.map(players => {
        return { ...players, score: 0, number: 0, active: false }
      })
    })
  }

  const handleRemoveAll = () => {
      setPlayers([])
  }

  return (
    <section className={styles.container}>
      <button className={styles.settingsButton} onClick={handleRemoveAll}>
        Remove All
      </button>
      <button className={styles.settingsButton} onClick={handleClearStats}>
        Clear Stats
      </button>
    </section>
  )
}

export default index
