import { MotiView } from "@motify/components";
import React from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";
import { styles } from "./styles";

export type MessageProps = {
  id: string
  text: string
  user: {
    name: string,
    avatar_url: string
  }
}

type Props = {
  data: MessageProps
}

export function Message ({ data }: Props) {
  const { id, text, user: { name: username, avatar_url } } = data;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
      key={id}
      style={styles.container}>
      <Text style={styles.message}>
        {text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto imageUri={avatar_url} size="SMALL" />
        <Text style={styles.username}>
          {username}
        </Text>
      </View>
    </MotiView>
  );
}