import { useNavigation } from "@react-navigation/native"
import { Button, FlatList, StyleSheet, Text, View } from "react-native"

type Character = {
  job: string
  key: number
  name: string
}

const data: Character[] = [
  {
    job: "pg",
    key: 0,
    name: "zero",
  },
  {
    job: "pg",
    key: 1,
    name: "taro",
  },
  {
    job: "student",
    key: 2,
    name: "jiro",
  },
]

export const ListPage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      <Button
        onPress={() => {
          navigation.navigate("index")
        }}
        title="Go to IndexPage"
      />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Text style={styles.item}>
              {item.name} : {item.job}
            </Text>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: 8,
    paddingTop: 32,
  },
  root: {},
})
