/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  chart: undefined | { chartType: "a" | "b" }
  home: undefined
  list: undefined
}

declare global {
  namespace ReactNavigation {
    // overwrite global navigation type definition
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
