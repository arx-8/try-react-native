import { objectEntries, objectKeys } from "src/utils/object"
import { expectType } from "tsd"

describe("objectKeys", () => {
  it("ok", () => {
    // ## Arrange ##
    // ## Act ##
    const result = objectKeys({
      a: "a",
      b: 2,
      c: {
        cc: "cc",
      },
    })

    // ## Assert ##
    expectType<("a" | "b" | "c")[]>(result)
    expect(result).toMatchInlineSnapshot(`
      Array [
        "a",
        "b",
        "c",
      ]
    `)
  })
})

describe("objectEntries", () => {
  it("ok", () => {
    // ## Arrange ##
    // ## Act ##
    const result = objectEntries({
      a: "a",
      b: 2,
      c: {
        cc: "cc",
      },
    })

    // ## Assert ##
    expectType<
      [
        "a" | "b" | "c",
        (
          | string
          | number
          | {
              cc: string
            }
        )
      ][]
    >(result)
    expect(result).toMatchInlineSnapshot(`
      Array [
        Array [
          "a",
          "a",
        ],
        Array [
          "b",
          2,
        ],
        Array [
          "c",
          Object {
            "cc": "cc",
          },
        ],
      ]
    `)
  })
})
