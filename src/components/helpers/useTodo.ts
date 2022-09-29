import { useLoading } from "@rest-hooks/hooks"
import { useCallback, useState } from "react"
import * as storage from "src/data/storage"
import { generateTodoID, Todo } from "src/models/todo"
import { sleep } from "src/utils/process"

type MaybeError = Error | undefined

type Returns = {
  addTodo: (newTodo: Omit<Todo, "id">) => Promise<void>
  deleteTodo: (todoID: Todo["id"]) => Promise<void>
  errors: [errorOfAddTodo: MaybeError, errorOfDeleteTodo: MaybeError]
  fetchTodoList: () => Promise<void>
  loading: boolean
  todoList: Todo[]
}

export const useTodo = (): Returns => {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const [addTodo, loadingAddTodo, errorOfAddTodo] = useLoading<
    Returns["addTodo"]
  >(
    async (newTodo) => {
      const nextList = [
        ...todoList,
        {
          ...newTodo,
          id: generateTodoID(),
        },
      ]

      // sleep: for check loading. storage is too fast.
      await sleep(1000)
      await storage.write("todoList", nextList)
      setTodoList(nextList)
    },
    [todoList]
  )

  const [deleteTodo, loadingDeleteTodo, errorOfDeleteTodo] = useLoading<
    Returns["deleteTodo"]
  >(
    async (todoID) => {
      const nextList = todoList.filter((t) => t.id !== todoID)

      // sleep: for check loading. storage is too fast.
      await sleep(1000)
      await storage.write("todoList", nextList)
      setTodoList(nextList)
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
    errors: [errorOfAddTodo, errorOfDeleteTodo],
    fetchTodoList,
    loading: loadingAddTodo || loadingDeleteTodo,
    todoList,
  }
}
