export type RootStackParamList = {
  chart: undefined | { chartType: "a" | "b" }
  index: undefined
  list: undefined
  sql: undefined
  storage: undefined
}

declare global {
  namespace ReactNavigation {
    // overwrite global navigation type definition
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
