import { useNavigation } from "@react-navigation/native"
import { Button, StyleSheet, Text, View } from "react-native"

export const HomePage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      <Text>HomePage</Text>
      <Button
        title="Go to ChartPage"
        onPress={() => {
          navigation.navigate("chart")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
