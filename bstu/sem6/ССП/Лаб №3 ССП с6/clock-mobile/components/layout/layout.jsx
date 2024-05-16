import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import ClockSvg from "../../icons/clock-light";
import AlarmSvg from "../../icons/alarm-light";

export const Layout = ({ children, setPage }) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          onPress={() => setPage("clock-page")}
          style={styles.menuButton}
        >
          <ClockSvg width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPage("alarm-page")}
          style={styles.menuButton}
        >
          <AlarmSvg width={40} height={40} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 16,
    paddingTop: 12,
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  menuButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#323223",
  },
});
