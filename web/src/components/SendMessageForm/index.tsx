import { FormEvent, useContext, useState } from 'react'
import { FaGithub, FaSignOutAlt } from 'react-icons/fa'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api';
import styles from './styles.module.scss'

export function SendMessageForm () {
  const { user, signOut } = useContext(AuthContext);

  const [ message, setMessage ] = useState("");

  async function sendMessage (event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) return;

    await api.post("/message", { message });

    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <FaSignOutAlt size={32} />
      </button>

      <header className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGitHub}>
          <FaGithub size={16} />
          {user?.login}
        </span>
      </header>

      <form onSubmit={sendMessage} className={styles.sendMessageForm}>
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          name="mensagem"
          id="mensagem"
          placeholder="Qual sua expectativa para o evento?"
          value={message}
          onChange={e => setMessage(e.target.value)}>
        </textarea>

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}