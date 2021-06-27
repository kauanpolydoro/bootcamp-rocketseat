import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Home.module.css'

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();

    const data = {
      email, password
    }

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}
