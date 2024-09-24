import styles from '../styles/Home.module.css';

const ScoreButton = ({ player, operator, updatePlayer }) => {
  const changeScore = newValue => {
    if (newValue > 5) {
      return 5;
    }

    if (newValue < 0) {
      player.active = true;
      return 0;
    }

    return newValue;
  };

  const handleScoreChange = e => {
    e.stopPropagation();

    const score =
      operator === 'plus'
        ? changeScore(player.score + 1)
        : changeScore(player.score - 1);

    updatePlayer(player.id, {
      score,
      isDead: score === 0 && player.active,
    });

    e.target.classList.add(styles.animateScoreButton);
    setTimeout(() => {
      e.target.classList.remove(styles.animateScoreButton);
    }, 300);
  };

  return (
    <button className={styles.scoreButton} onClick={handleScoreChange}>
      <span className={styles.scoreButtonSpan}></span>
      {operator === 'plus' && <span className={styles.scoreButtonSpan}></span>}
    </button>
  );
};

export default ScoreButton;
