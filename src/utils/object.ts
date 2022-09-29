/**
 * Type-safe `Object.keys`
 */
export const objectKeys: <T extends string | number>(
  o: Record<T, unknown>
) => T[] = Object.keys

/**
 * Type-safe `Object.entries`
 */
export const objectEntries: <T extends string | number, V>(
  o: Record<T, V>
) => [T, V][] = Object.entries
