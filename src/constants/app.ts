import { RootStackParamList } from "src/types/@react-navigation"
import { Equal, Expect } from "src/types/utils"

export const pageNames = ["chart", "home", "list", "sql"] as const

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TestMustBeSamePageKeys = Expect<
  Equal<typeof pageNames[number], keyof RootStackParamList>
>
