import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Layout } from "./components/layout/layout";
import { useEffect, useState } from "react";
import { AlarmModal } from "./components/alarm-modal";

import { ClockPage } from "./pages/clock-page";
import { AlarmPage } from "./pages/alarm-page";
import { GlobalClock } from "./clock";

const ALARM_TIME_MINS = new Array(5)
  .fill(null)
  .map((_, i) => new Date().getHours() * 60 + new Date().getMinutes() + i + 1);

export default function App() {
  const [page, setPage] = useState("clock-page");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(true);

  const [alarms, setAlarms] = useState(
    ALARM_TIME_MINS.map((mins) => ({
      time: mins,
      isTurned: false,
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const turnedAlarms = [...alarms].filter((a) => a.isTurned);
      const isAnyReadyToBell = turnedAlarms.some(
        (a) =>
          a.time ===
            GlobalClock.getDate().getHours() * 60 +
              GlobalClock.getDate().getMinutes() && a.isTurned
      );
      if (isAnyReadyToBell) {
        setIsAlarmModalOpen(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  return (
    <>
      {isAlarmModalOpen && (
        <AlarmModal
          setTurnOff={() => {
            setAlarms(
              [...alarms].map((a) =>
                a.time ===
                GlobalClock.getDate().getHours() * 60 +
                  GlobalClock.getDate().getMinutes()
                  ? { ...a, isTurned: false }
                  : { ...a }
              )
            );
            setIsAlarmModalOpen(false);
          }}
        />
      )}
      <View style={styles.container}>
        <Layout setPage={setPage}>
          {page === "clock-page" && <ClockPage alarms={alarms} />}
          {page === "alarm-page" && (
            <AlarmPage alarms={alarms} setAlarms={setAlarms} />
          )}
        </Layout>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
