import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { DarkContent } from '../style-constants';

interface ButtonProps {
  onPress: () => void,
  buttonStyles?: object,
  text?: string,
  textStyles?: object,
  icon?: any,
  iconStyles?: object,
  children?: React.ReactNode,
}

export const ButtonUI = ({
  onPress, text, textStyles,
  icon, iconStyles, children, buttonStyles
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
      onPress={() => {
        setIsPressed(true)
        onPress()
        setTimeout(() => {
          setIsPressed(false)
        }, 500)
      }}
      style={{ ...(buttonStyles || styles.button), ...(isPressed ? styles.pressedButton : {}) }}
    >
      {children && children}
      {text && <Text
        style={{ ...(textStyles || styles.text), ...(isPressed ? styles.pressedText: {}) }}
      >{text}</Text>}
      {icon && <Image
        style={iconStyles ? iconStyles : styles.icon}
        source={icon}
      />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {

  },
  text: {

  },
  icon: {

  },
  pressedButton: {
    backgroundColor: DarkContent
  }, 
  pressedText: {
    fontSize: 22,
  }
});
