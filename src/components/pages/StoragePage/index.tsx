import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Checkbox, DataTable, Headline, Text } from "react-native-paper"
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
      <View>
        <Headline>TODO App</Headline>
      </View>

      <View style={styles.inputMemoView}>
        <Text>Memo:</Text>
        <TextInput
          style={styles.inputMemo}
          value={memo}
          onChangeText={setMemo}
          multiline
        />
      </View>
      <View style={styles.inputDoneView}>
        <Text>Done?:</Text>
        <Checkbox
          status={done ? "checked" : "unchecked"}
          onPress={() => setDone(!done)}
        />
      </View>
      <View>
        <Button
          loading={loading}
          disabled={loading}
          uppercase={false}
          mode="contained"
          onPress={onSubmit}
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
                  loading={loading}
                  disabled={loading}
                  mode="contained"
                  onPress={() => {
                    deleteTodo(t.id).catch((e) => console.log(e))
                  }}
                  icon="delete-forever"
                  color="red"
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
