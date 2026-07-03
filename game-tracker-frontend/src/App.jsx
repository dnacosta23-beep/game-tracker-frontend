import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [players, setPlayers] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [gameName, setGameName] = useState('')

  const API_URL = 'http://127.0.0.1:5000'

  async function fetchPlayers() {
    try {
      const response = await fetch(`${API_URL}/players`)
      const data = await response.json()
      setPlayers(data.players)
    } catch (error) {
      console.error('Error fetching players:', error)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const newPlayer = {
      username: username,
      email: email,
      game_name: gameName
    }

    try {
      const response = await fetch(`${API_URL}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      })

      const data = await response.json()
      console.log('Player added:', data)

      setUsername('')
      setEmail('')
      setGameName('')

      fetchPlayers()
    } catch (error) {
      console.error('Error adding player:', error)
    }
  }

  return (
    <>
      <div className="app">
      <h1>Online Game Player Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />

        <button type="submit">Add Player</button>
      </form>

      <h2>Current Players</h2>

      {players.map((player) => (
        <div key={player.id} className="player-card">
          <h3>{player.username}</h3>
          <p>Email: {player.email}</p>
          <p>Game: {player.game_name}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
