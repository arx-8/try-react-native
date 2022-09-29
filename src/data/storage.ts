import AsyncStorage from "@react-native-async-storage/async-storage"
import { JSONValue } from "src/types/utils"

export type AvailableStorageKey = "todoList"

export const write = (
  key: AvailableStorageKey,
  value: JSONValue
): Promise<void> => {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const read = async <T = JSONValue>(
  key: AvailableStorageKey
): Promise<T | undefined> => {
  const rawValue = await AsyncStorage.getItem(key)
  if (rawValue == null) {
    return
  }
  return JSON.parse(rawValue) as T
}
