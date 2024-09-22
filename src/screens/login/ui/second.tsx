'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export const LoginPage1 = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        password,
        username,
      })
      console.log(res)
    } catch (error_) {
      console.log(error_)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>} {/* Виводимо помилку, якщо є */}
      <button type="submit">Log in</button>
    </form>
  )
}
