import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Form = ({ setPlayers, setLocalStorage }) => {
  const [input, setInput] = useState({
    name: '',
  })

  const createNewPlayer = name => {
    return { id: Date.now(), name, score: 0, number: '' }
  }

  const handleChange = e => {
    const { name, value } = e.target

    setInput(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!input.name) {
      return
    }

    const newPlayer = createNewPlayer(input.name)
    setPlayers(prev => {
      setLocalStorage([...prev, newPlayer])
      return [...prev, newPlayer]
    })
    setInput({ name: '' })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.formInput}
        name="name"
        type="text"
        value={input.name}
        onChange={handleChange}
        placeholder="add player"
      />
      <button className={styles.submitButton} type="submit">
        &#8594;
      </button>
    </form>
  )
}

export default Form
