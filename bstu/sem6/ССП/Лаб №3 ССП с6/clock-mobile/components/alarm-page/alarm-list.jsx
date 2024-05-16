import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Switch } from "react-native";
import { padTime } from "../../utils/padTime";

export const AlarmList = ({ alarms, setAlarms }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[...alarms]
        .sort((a, b) => a.time - b.time)
        .sort((a, b) => (a.isTurned === b.isTurned ? 0 : a.isTurned ? -1 : 1))
        .map((alarm, index) => (
          <View style={styles.item} key={alarm.time}>
            <Text style={styles.itemText}>{`${padTime(
              Math.trunc(alarm.time / 60)
            )}:${padTime(Math.trunc(alarm.time % 60))}`}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={alarm.isTurned ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setAlarms(
                  [...alarms].map((a) =>
                    alarm.time === a.time ? { ...a, isTurned: !a.isTurned } : a
                  )
                );
              }}
              value={alarm.isTurned}
            />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    paddingLeft: 20,
    paddingRight: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: "#fafafa",
    fontSize: 30,
  },
});
