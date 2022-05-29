import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider as PaperProvider } from "react-native-paper"
import { ChartPage } from "src/components/pages/ChartPage"
import { HomePage } from "src/components/pages/HomePage"
import { ListPage } from "src/components/pages/ListPage "
import { SQLPage } from "src/components/pages/SQLPage"
import { RootStackParamList } from "src/types/@react-navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="chart" component={ChartPage} />
          <Stack.Screen name="list" component={ListPage} />
          <Stack.Screen name="sql" component={SQLPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
