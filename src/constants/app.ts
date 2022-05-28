import { RootStackParamList } from "src/packages/@react-navigation"
import { Equal, Expect } from "src/packages/utils"

export const pageNames = ["chart", "home", "list", "sql"] as const

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TestMustBeSamePageKeys = Expect<
  Equal<typeof pageNames[number], keyof RootStackParamList>
>
