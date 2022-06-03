import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useMemo } from "react"
import { useColorScheme } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { ChartPage } from "src/components/pages/ChartPage"
import { IndexPage } from "src/components/pages/IndexPage"
import { ListPage } from "src/components/pages/ListPage "
import { SQLPage } from "src/components/pages/SQLPage"
import { StoragePage } from "src/components/pages/StoragePage"
import { RootStackParamList } from "src/types/@react-navigation"
import { objectEntries } from "src/utils/object"

const screens: {
  // "index" is excluded because it is the screen that should be transitioned 1st.
  [name in Exclude<keyof RootStackParamList, "index">]: () => JSX.Element
} = {
  chart: ChartPage,
  list: ListPage,
  sql: SQLPage,
  storage: StoragePage,
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(): JSX.Element {
  const colorScheme = useColorScheme()

  const navigationTheme = useMemo(() => {
    return colorScheme === "dark" ? DarkTheme : DefaultTheme
  }, [colorScheme])

  return (
    <PaperProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator>
          <Stack.Screen name="index" component={IndexPage} />
          {objectEntries(screens).map(([name, component]) => {
            return <Stack.Screen key={name} name={name} component={component} />
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
