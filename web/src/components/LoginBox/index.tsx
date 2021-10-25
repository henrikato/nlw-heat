import { useContext } from "react"
import { FaGithub } from "react-icons/fa"
import { AuthContext } from "../../contexts/auth"

import styles from './styles.module.scss'

export function LoginBox () {
  const { signInUrl, user } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href={signInUrl} className={styles.signInWithGitHub}>
        <FaGithub size={24} />
        Entrar com GitHub
      </a>
    </div>
  )
}