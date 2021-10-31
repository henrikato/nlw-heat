import React from "react";
import { ActivityIndicator, ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoading?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
}

export function Button ({ title, color, backgroundColor, icon, isLoading = false, ...props }: Props) {
  return (
    <TouchableOpacity activeOpacity={.7} disabled={isLoading} style={[ styles.button, { backgroundColor } ]} {...props}>
      {
        isLoading ? <ActivityIndicator color={color} /> :
        <>
          <FontAwesome name={icon} size={24} style={styles.icon} />
          <Text style={[ styles.title, { color } ]}>
            {title}
          </Text>
        </>
      }
    </TouchableOpacity>
  )
}