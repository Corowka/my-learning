import { StyleSheet, Text, View, Image } from 'react-native';

interface PlateProps {
  plateStyles: object,
  boxStyles: object,
  text: string,
  textStyles: object,
  value: string,
  valueStyles: object,
}

export const PlateUI = ({
  plateStyles,
  boxStyles,
  text,
  textStyles,
  value,
  valueStyles,
}: PlateProps) => {

  return (
    <View style={plateStyles}>
      <View style={boxStyles}>
        <Text style={textStyles}>{text}</Text>
      </View>
      <Text style={valueStyles}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
