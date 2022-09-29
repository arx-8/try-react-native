import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"

/**
 * key names reserved, but no official type...
 * @see https://reactnavigation.org/docs/navigation-prop/#setoptions
 */
type ScreenOptions = {
  /**
   * header title
   */
  title: string
}

type Props = ScreenOptions

export const NavigationOptions = (props: Props): null => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions(props)
  }, [navigation, props])

  return null
}
