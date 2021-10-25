import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import io from 'socket.io-client'
import { Message } from '../../@types/messageList'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

const messageQueue: Array<Message> = [];

const socket = io("http://localhost:4000");

socket.on("new_message", data => messageQueue.push(data));

export function MessageList () {
  const [ messages, setMessages ] = useState<Array<Message>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length) {
        setMessages(prevState => [
          messageQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean));

        messageQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Array<Message>>("message").then(({data}) => setMessages(data));
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="DoWhile 2021" />

      <ul className={styles.messageList}>        
      {
        messages.map(({id, text, user: {avatar_url, name}}) => (
          <li key={id} className={styles.message}>
            <p className={styles.messageContent}>{text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={avatar_url} alt={name} />
              </div>
              <span>{name}</span>
            </div>
          </li>
        ))
      }
      </ul>
    </div>
  )
}