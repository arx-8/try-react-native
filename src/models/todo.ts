import { Brand } from "utility-types"

export type TodoID = Brand<number, "TodoID">

export type Todo = {
  done: boolean
  id: TodoID
  memo: string
}

/**
 * Note: Millisecond precision.
 */
export const generateTodoID = (): TodoID => {
  return new Date().getTime() as TodoID
}
