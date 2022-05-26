import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ChartPage } from "src/components/pages/ChartPage"
import { HomePage } from "src/components/pages/HomePage"
import { RootStackParamList } from "src/packages/@react-navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="chart" component={ChartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
