import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import Reactotron from "reactotron-react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export function SendMessageForm () {
  const [ message, setMessage ] = useState("");
  const [ sendingMessage, setSendingMessage ] = useState(false);

  async function handleMessageSubmit () {
    let formattedMessage = message.trim();
    
    setSendingMessage(true);

    if (formattedMessage.length) {
      try {  
        await api.post("/message", { message: formattedMessage });
  
        setMessage("");
        Keyboard.dismiss();
        Alert.alert("Sucesso", "Mensagem enviada com sucesso!"); 

      } catch (error: any) {
        Reactotron.log!(error);
        Alert.alert("Erro", "Ocorreu um erro ao enviar sua mensagem, aguarde alguns instantes e tente novamente.");
      }
    } else {
      Alert.alert("Atencao", "Escreva a mensagem para enviar");
    }

    setSendingMessage(false);
  }


  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
        style={styles.input}
        returnKeyType="send"
        returnKeyLabel="Enviar"
        onSubmitEditing={handleMessageSubmit} />

      <Button
        isLoading={sendingMessage}
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit} />
    </View>
  )
}