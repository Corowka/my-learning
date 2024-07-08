import { StyleSheet, Text, View } from 'react-native';
import { Content, DarkContent } from '../style-constants';
import { ButtonUI } from '../UI/button';

export const SendLayout = () => {
  const sendHandler = () => console.log("send to arm")

  return (
    <View style={styles.container}>
      <ButtonUI
        buttonStyles={styles.button}
        textStyles={styles.buttonText}
        text="GO"
        onPress={sendHandler}
      ></ButtonUI>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Content,
  },
  button: {
    zIndex: 100,
    backgroundColor: Content,
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 15,
    borderColor: "white",
    borderRadius: 35,
    borderWidth: 5,
    alignSelf: "center",
    shadowColor: DarkContent,
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 10},
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    paddingBottom: 4,
    fontWeight: "700",
  }
});