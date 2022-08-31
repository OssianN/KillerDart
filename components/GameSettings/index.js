import styles from './gameSettings.module.css'

const index = ({ handleClearStats, handleRemoveAll }) => {
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
