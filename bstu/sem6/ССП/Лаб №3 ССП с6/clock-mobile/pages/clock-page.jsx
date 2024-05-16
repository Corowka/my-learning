import { StyleSheet, View, Text } from "react-native";
import { Clock } from "../components/clock-page/clock";

export const ClockPage = () => {
  return (
    <View style={styles.container}>
      <Clock />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#232323",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
