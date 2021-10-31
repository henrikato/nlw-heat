import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import io from 'socket.io-client';
import { api } from "../../services/api";

import { Message, MessageProps } from "../Message";
import { styles } from "./styles";


let messageQueue: Array<MessageProps> = [];
const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (mensagem: MessageProps) => {
  messageQueue.push(mensagem);
});

export function MessageList() {
  const [ messages, setMessages ] = useState<Array<MessageProps>>([]);

  useEffect(() => {
    async function fetchMessages () {
      let { data } = await api.get<Array<MessageProps>>("/message");
      setMessages(data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      if (messageQueue.length) {
        setMessages(prevState => [
          messageQueue[0],
          prevState[0],
          prevState[1]
        ]);
        messageQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
      data={messages}
      renderItem={({item}) => <Message key={item.id} data={item} />} />
  )
}