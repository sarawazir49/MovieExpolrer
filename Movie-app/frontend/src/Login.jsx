import { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isRegister ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (data.error) { setMsg(data.error); return }
    if (isRegister) { setMsg('Registered! Now Login'); setIsRegister(false); return }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', data.username)
    onLogin(data.username)
  }

  return (
    <div className="login-page">
      <h1>🎬 Movie Explorer</h1>
      <form onSubmit={handleSubmit} className="login-box">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <p>{msg}</p>
        <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', color: '#e50914' }}>
          {isRegister ? 'Already have account? Login' : "No account? Register"}
        </p>
      </form>
    </div>
  )
}