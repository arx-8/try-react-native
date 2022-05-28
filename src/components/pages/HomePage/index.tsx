import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { pageNames } from "src/constants/app"

export const HomePage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      <Text>HomePage</Text>

      {pageNames.map((name) => {
        return (
          <View style={styles.buttonWrapper} key={name}>
            <Button
              uppercase={false}
              onPress={() => {
                navigation.navigate(name)
              }}
              mode="contained"
            >
              Go to {name} page
            </Button>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingTop: 8,
  },
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
