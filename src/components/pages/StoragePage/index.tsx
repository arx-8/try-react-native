import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Checkbox, DataTable, Headline, Text } from "react-native-paper"
import { NavigationOptions } from "src/components/helpers/NavigationOptions"
import { useTodo } from "src/components/helpers/useTodo"
import { color } from "src/components/styles/utils"

export const StoragePage = (): JSX.Element => {
  const { addTodo, deleteTodo, fetchTodoList, loading, todoList } = useTodo()
  const [memo, setMemo] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetchTodoList().catch((e) => console.error(e))
  }, [fetchTodoList])

  const onSubmit = (): void => {
    addTodo({
      done,
      memo,
    }).catch((e) => console.log(e))

    // initialize
    setMemo("")
    setDone(false)
  }

  return (
    <View style={styles.root}>
      <NavigationOptions
        title={`Last rendered: ${new Date().toLocaleString()}`}
      />
      <View>
        <Headline>TODO App</Headline>
      </View>

      <View style={styles.inputMemoView}>
        <Text>Memo:</Text>
        <TextInput
          multiline
          onChangeText={setMemo}
          style={styles.inputMemo}
          value={memo}
        />
      </View>
      <View style={styles.inputDoneView}>
        <Text>Done?:</Text>
        <Checkbox
          onPress={() => setDone(!done)}
          status={done ? "checked" : "unchecked"}
        />
      </View>
      <View>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={onSubmit}
          uppercase={false}
        >
          Submit
        </Button>
      </View>

      <DataTable style={styles.tableRoot}>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Memo</DataTable.Title>
          <DataTable.Title>Done?</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {todoList.map((t) => {
          return (
            <DataTable.Row key={t.id}>
              <DataTable.Cell>{t.id}</DataTable.Cell>
              <DataTable.Cell>{t.memo}</DataTable.Cell>
              <DataTable.Cell>{t.done ? "✅" : ""}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  color="red"
                  disabled={loading}
                  icon="delete-forever"
                  loading={loading}
                  mode="contained"
                  onPress={() => {
                    deleteTodo(t.id).catch((e) => console.log(e))
                  }}
                >
                  Delete
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          )
        })}
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  inputDoneView: {
    paddingTop: 8,
  },
  inputMemo: {
    backgroundColor: color.bright,
    height: 80,
  },
  inputMemoView: {
    paddingTop: 8,
  },
  root: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  tableRoot: {
    marginTop: 8,
  },
})
