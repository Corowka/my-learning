import {
  StyleSheet, Text, View,
  FlatList, SafeAreaView, StatusBar,
  Image, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient"
import { PastelGreen, PastelBlue, PastelPink, Content } from "../style-constants"

const ITEMS = [
  { name: "Hand\nControl", icon: require("../../assets/application-1.png"), color: PastelGreen, link: "HandControlApp" },
  { name: "Speech To\nGestures", icon: require("../../assets/application-2.png"), color: PastelPink, link: "SpeechToGesturesApp" },
  { name: "Common\nGestures", icon: require("../../assets/application-3.png"), color: PastelBlue, link: "CommonGesturesApp" },
]

interface ItemProps { name: string, icon: any, color: string, link: string }

const Item = ({ name, icon, color, link }: ItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(link as never)}>
      <LinearGradient style={styles.item} colors={[Content, color]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <Text style={styles.name}>{name}</Text>
        <Image source={icon} style={styles.icon} />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export const AppsList = () => (
  <SafeAreaView style={styles.safeArea}>
    <FlatList
      contentContainerStyle={styles.container}
      data={ITEMS}
      renderItem={({ item }) => <Item name={item.name} icon={item.icon} color={item.color} link={item.link} />}
      keyExtractor={(item) => item.name}
    >
    </FlatList>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    padding: 12,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 10,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  name: {
    paddingLeft: 12,
    paddingBottom: 12,
    borderRadius: 6,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    borderRadius: 16,
    width: 96,
    height: 96,
  },
})
