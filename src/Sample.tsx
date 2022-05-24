import { StyleSheet, Text, View } from "react-native"

export const Sample = (): JSX.Element => {
  return (
    <View>
      <Text style={styles.text}>Hello Sample component</Text>
    </View>
  )
}

const red = "red"

const styles = StyleSheet.create({
  text: {
    backgroundColor: red,
  },
})
