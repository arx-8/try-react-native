import { StyleSheet, Text, View } from "react-native"
import { Victory } from "src/packages/victory"

export const Sample = (): JSX.Element => {
  return (
    <View>
      <Text style={styles.text}>Hello Sample component</Text>

      <Victory.VictoryPolarAxis />
    </View>
  )
}

const red = "red"

const styles = StyleSheet.create({
  text: {
    backgroundColor: red,
  },
})
