import { useNavigation } from "@react-navigation/native"
import { Button, StyleSheet, Text, View } from "react-native"
import { pageNames } from "src/constants/app"

export const HomePage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      <Text>HomePage</Text>

      {pageNames.map((n) => {
        return (
          <View style={styles.button} key={n}>
            <Button
              title={`Go to ${n} page`}
              onPress={() => {
                navigation.navigate(n)
              }}
            />
          </View>
        )
      })}
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
