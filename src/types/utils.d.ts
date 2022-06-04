/**
 * @see https://github.com/type-challenges/type-challenges/blob/f9b3bb0b5f7e9095be840fe3cba154f6f0566693/utils/index.d.ts
 */
export type Expect<T extends true> = T

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>
