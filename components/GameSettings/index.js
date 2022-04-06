import styles from './gameSettings.module.css'

const index = ({ setPlayers, setLocalStorage }) => {
  const handleClearStats = () => {
    setPlayers(prev => {
      const newList = prev.map(player => {
        return { ...player, score: 0, number: '', active: false, isDead: false }
      })
      setLocalStorage(newList)
      return newList
    })
  }

  const handleRemoveAll = () => {
    setLocalStorage([])
    setPlayers(prev => {
      console.log(prev)
      return []
    })
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
