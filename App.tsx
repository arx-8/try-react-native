import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider as PaperProvider } from "react-native-paper"
import { ChartPage } from "src/components/pages/ChartPage"
import { IndexPage } from "src/components/pages/IndexPage"
import { ListPage } from "src/components/pages/ListPage "
import { SQLPage } from "src/components/pages/SQLPage"
import { RootStackParamList } from "src/types/@react-navigation"
import { objectEntries } from "src/utils/object"

const screens: {
  // "index" is excluded because it is the screen that should be transitioned 1st.
  [name in Exclude<keyof RootStackParamList, "index">]: () => JSX.Element
} = {
  chart: ChartPage,
  list: ListPage,
  sql: SQLPage,
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
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
