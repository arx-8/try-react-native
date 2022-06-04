import { useCallback, useState } from "react"
import * as storage from "src/data/storage"
import { generateTodoID, Todo } from "src/models/todo"

type Returns = {
  addTodo: (newTodo: Omit<Todo, "id">) => void
  deleteTodo: (todoID: Todo["id"]) => void
  fetchTodoList: () => Promise<void>
  todoList: Todo[]
}

export const useTodo = (): Returns => {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const addTodo: Returns["addTodo"] = useCallback(
    (newTodo) => {
      const nextList = [
        ...todoList,
        {
          ...newTodo,
          id: generateTodoID(),
        },
      ]

      // TODO loading
      storage
        .write("todoList", nextList)
        .then(() => {
          setTodoList(nextList)
          return undefined
        })
        .catch((e) => console.error(e))
    },
    [todoList]
  )

  const deleteTodo: Returns["deleteTodo"] = useCallback(
    (todoID) => {
      const nextList = todoList.filter((t) => t.id !== todoID)

      // TODO loading
      storage
        .write("todoList", nextList)
        .then(() => {
          setTodoList(nextList)
          return undefined
        })
        .catch((e) => console.error(e))
    },
    [todoList]
  )

  const fetchTodoList: Returns["fetchTodoList"] = useCallback(async () => {
    const loadedList = await storage.read<Todo[]>("todoList")
    setTodoList(loadedList == null ? [] : loadedList)
  }, [])

  return {
    addTodo,
    deleteTodo,
    fetchTodoList,
    todoList,
  }
}
