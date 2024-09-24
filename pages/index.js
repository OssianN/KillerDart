import { useState, useEffect } from 'react';
import GameSettings from '../components/GameSettings';
import Form from '../components/Form';
import PlayersList from '../components/PlayersList';
import styles from '../styles/Home.module.css';

const resetPlayerStats = (players, winnerId) =>
  players.map(player => ({
    ...player,
    score: 0,
    number: '',
    active: false,
    isDead: false,
    wins: player.id === winnerId ? player.wins + 1 : player.wins,
  }));

const Home = () => {
  const [players, setPlayers] = useState([]);

  const setLocalStorage = players => {
    localStorage.setItem('players', JSON.stringify(players));
  };

  const handleClearStats = () => {
    const winnerId = isWinner(players);
    const newList = resetPlayerStats(players, winnerId);

    setLocalStorage(newList);
    setPlayers(newList);
  };

  const handleRemoveAll = () => {
    setLocalStorage([]);
    setPlayers([]);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const localList = JSON.parse(localStorage.getItem('players')) ?? [];
    setPlayers(localList);
  }, []);

  const handlePlayerActive = player => {
    if (player.score > 0) {
      player.active = true;
    }
  };

  const isWinner = players => {
    const winners = players.filter(player => player.score === 5);
    return winners.length === 1 ? winners[0].id : null;
  };

  const updatePlayer = (id, value) => {
    const newList = players.map(player => {
      handlePlayerActive(player);
      return player.id === Number(id) ? { ...player, ...value } : player;
    });

    setPlayers(newList);
    setLocalStorage(newList);
  };

  return (
    <main className={styles.container}>
      <GameSettings
        handleClearStats={handleClearStats}
        handleRemoveAll={handleRemoveAll}
      />
      <PlayersList
        players={players}
        updatePlayer={updatePlayer}
        setPlayers={setPlayers}
        setLocalStorage={setLocalStorage}
      />
      <Form setPlayers={setPlayers} setLocalStorage={setLocalStorage} />
    </main>
  );
};

export default Home;
