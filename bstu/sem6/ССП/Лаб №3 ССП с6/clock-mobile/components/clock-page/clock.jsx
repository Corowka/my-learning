import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalClock } from "../../clock";
import { padTime } from "../../utils/padTime";

export const Clock = () => {
  const [date, setDate] = useState(GlobalClock.getDate());
  setInterval(() => {
    setDate(GlobalClock.getDate());
  }, 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return (
    <View style={styles.container}>
      <Text style={styles.clockTime}>{`${padTime(hours)}:${padTime(
        mins
      )}:${padTime(seconds)}`}</Text>
      <Text style={styles.clockDate}>{`${padTime(day)} ${padTime(
        month
      )} ${padTime(year)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clockTime: {
    color: "#fafa",
    fontSize: 56,
  },
  clockDate: {
    color: "#fafa",
    fontSize: 20,
  },
});
