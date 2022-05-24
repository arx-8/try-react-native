import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Sample } from "src/Sample"

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Sample />
    </View>
  )
}

const white = "#fff"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    flex: 1,
    justifyContent: "center",
  },
})
