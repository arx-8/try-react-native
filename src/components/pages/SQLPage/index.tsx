import { StyleSheet, Text, View } from "react-native"
import { Button, DataTable } from "react-native-paper"
import { useDB } from "src/components/helpers/useDB"

export const SQLPage = (): JSX.Element => {
  const { ingredients, loading, selectIngredients } = useDB()

  return (
    <View style={styles.root}>
      <Text>loading?: {loading ? "true" : "false"}</Text>
      <View style={styles.space} />
      <Button
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          selectIngredients()
        }}
      >
        Load data
      </Button>
      <DataTable style={styles.tableRoot}>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Classification</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>

        {ingredients.map((ing) => {
          return (
            <DataTable.Row key={ing.id}>
              <DataTable.Cell>{ing.id}</DataTable.Cell>
              <DataTable.Cell>{ing.classification}</DataTable.Cell>
              <DataTable.Cell>{ing.name}</DataTable.Cell>
            </DataTable.Row>
          )
        })}
      </DataTable>
    </View>
  )
}

const bgColor = "gray"

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  space: {
    paddingTop: 8,
  },
  tableRoot: {
    backgroundColor: bgColor,
  },
})
