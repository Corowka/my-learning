import { StyleSheet, View, Text } from "react-native";
import { AlarmList } from "../components/alarm-page/alarm-list";

export const AlarmPage = ({ alarms, setAlarms }) => {
  return (
    <View style={styles.container}>
      <AlarmList alarms={alarms} setAlarms={setAlarms} />
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
