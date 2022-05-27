import { useNavigation } from "@react-navigation/native"
import { Button, StyleSheet, Text, View } from "react-native"

export const HomePage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      <Text>HomePage</Text>
      <View style={styles.button}>
        <Button
          title="Go to ChartPage"
          onPress={() => {
            navigation.navigate("chart")
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to ListPage"
          onPress={() => {
            navigation.navigate("list")
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 8,
  },
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
