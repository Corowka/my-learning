import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SendLayout } from '../layouts/send-layout';
import { PlateUI } from '../UI/plate';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ClarityContent, Content, LightContent, PastelGreen, PastelPink } from '../style-constants';
import CircleSlider from "react-native-circle-slider";

type HandItem = {
  name: string,
  state: number,
}

const MAX_STATE = 100
const MIN_STATE = 0

const HAND_ITEMS: HandItem[] = [
  { name: "Little Finger", state: MAX_STATE },
  { name: "Ring Finger", state: MAX_STATE },
  { name: "Middle Finger", state: MAX_STATE },
  { name: "Index Finger", state: MAX_STATE },
  { name: "Thumb", state: MAX_STATE },
  { name: "Thumb Rotation", state: MAX_STATE },
  { name: "Wrist", state: MAX_STATE },
]

export const HandControlApp = () => {
  const [handStates, setHandStates] = useState(HAND_ITEMS.map(item => item.state))
  const [activeState, setActiveState] = useState<null | number>(null)

  return (
    <LinearGradient style={styles.container}
      colors={[PastelGreen, PastelPink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    > 
      <Pressable
        onPress={() => setActiveState(null)}
        style={styles.container}>
        <SendLayout />
        {(activeState !== null)
          ? <View style={styles.slider}>
            <CircleSlider
              meterColor={Content}
              strokeWidth={1}
              min={0}
              max={180}
              dialRadius={60}
              value={Math.round(handStates[activeState] * 180 / MAX_STATE)}
              onValueChange={value => {
                value = Math.round(MAX_STATE / 180 * value)
                const newHandStates = handStates.map(
                  (state, index) => (index === activeState ? value : state)
                )
                console.log(newHandStates)
                setHandStates(newHandStates)
                return value
              }}
            />
          </View>
          : null}
        <View style={styles.states}>
          {HAND_ITEMS.map((item, index) =>
            <Pressable
              onPress={() => setActiveState(index)}
              key={index}
            >
              <PlateUI
                plateStyles={styles.plate}
                boxStyles={(activeState === index) ? styles.activeBox : styles.box}
                text={item.name}
                textStyles={(activeState === index) ? styles.activeText : styles.text}
                value={String(handStates[index])}
                valueStyles={styles.value}
              />
            </Pressable>)}
        </View>
      </Pressable>
    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  slider: {
    transform: [
      { rotate: '0deg' },
    ],
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
  },
  states: {
    padding: 10,
    paddingBottom: 60,
    display: "flex",
    alignItems: "flex-start",
  },
  plate: {
    width: "100%",
    borderRadius: 16,
    display: "flex",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  box: {
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Content,
    marginRight: 8,
  },
  activeBox: {
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  activeText: {
    fontSize: 16,
    fontWeight: "500",
    color: Content,
  },
  value: {
    fontWeight: "700",
    color: Content,
    marginRight: 16,
  },
});
