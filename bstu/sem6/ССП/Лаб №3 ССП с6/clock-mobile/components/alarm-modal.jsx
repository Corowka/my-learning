import { useEffect, useState } from "react";
import { StyleSheet, Text, Modal, TouchableOpacity, View } from "react-native";
import { padTime } from "../utils/padTime";
import { GlobalClock } from "../clock";

export const AlarmModal = ({ setTurnOff }) => {
  return (
    <Modal animationType="fade">
      <View style={styles.container}>
        <Text style={styles.time}>{`${padTime(
          GlobalClock.getDate().getHours()
        )}:${padTime(GlobalClock.getDate().getMinutes())}`}</Text>
        <TouchableOpacity onPress={() => setTurnOff()}>
          <View style={styles.turnOffButton}>
            <Text style={styles.turnOffButtonText}>Turn off</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 6,
  },
  time: {
    color: "#fafa",
    fontSize: 56,
  },
  turnOffButton: {
    marginTop: 20,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#323232",
    borderRadius: 8,
  },
  turnOffButtonText: {
    color: "#fafafa",
    fontSize: 20,
  },
});
