import { openDatabase } from "expo-sqlite"
import { useCallback, useEffect, useState } from "react"
import { assertNever } from "src/utils/type"

type Classification = "meat" | "fish" | "vegetable"

type Ingredient = {
  classification: Classification
  id: number
  name: string
}

const createStatement = `--sql
  CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT
    , classification TEXT NOT NULL
    , name TEXT NOT NULL
  );
`
const initTestDataStatement = `--sql
    DELETE FROM ingredients WHERE 1 = 1;
`
const insertTestDataStatement = `--sql
  INSERT INTO ingredients (classification, name) VALUES
      ("vegetable", "tomato")
    , ("vegetable", "onion")
    , ("meet", "beef")
    , ("meet", "pork")
    , ("meet", "chicken")
    , ("fish", "mackerel")
    , ("fish", "salmon")
    , ("fish", "mackerel")
    , ("fish", "mackerel")
    , ("fish", "mackerel")
    , ("fish", "mackerel")
    , ("fish", "mackerel")
    , ("fish", "mackerel")
  ;
`

const selectIngredientsStatement = `--sql
  SELECT *
  FROM ingredients
  ;
`

type Returns = {
  ingredients: Ingredient[]
  loading: boolean
  selectIngredients: () => Promise<void>
}

type DBStatus = "not_opened" | "working" | "not_working"

export const useDB = (): Returns => {
  const [dbStatus, setDBStatus] = useState<DBStatus>("not_opened")
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  const db = openDatabase("app.db")

  useEffect(() => {
    // init DB
    db.transaction((tx) => {
      tx.executeSql(
        createStatement,
        [],
        () => {
          console.log("create table succeeded")
        },
        (_tx, error) => {
          console.error("failed")
          console.error(error)
          setDBStatus("not_working")
          return false
        }
      )

      // init test data
      tx.executeSql(initTestDataStatement)

      // insert test data
      tx.executeSql(
        insertTestDataStatement,
        [],
        () => {
          console.log("insert test data succeeded")
          setDBStatus("working")
        },
        (_tx, error) => {
          console.error("failed")
          console.error(error)
          setDBStatus("not_working")
          return false
        }
      )
    })
    // initialization execute only the 1st time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectIngredients: Returns["selectIngredients"] =
    useCallback(async () => {
      switch (dbStatus) {
        case "not_working":
          throw new Error("DB is not working")

        case "not_opened":
          return

        case "working":
          setLoading(true)
          return new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                selectIngredientsStatement,
                [],
                (_tx, result) => {
                  const results = []
                  for (let index = 0; index < result.rows.length; index++) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const row = result.rows.item(index)
                    results.push(row)
                  }
                  setIngredients(results)
                  setLoading(false)
                  resolve()
                },
                (_tx, error) => {
                  console.error(error)
                  setLoading(false)
                  reject(error)
                  return false
                }
              )
            })
          })

        default:
          return assertNever(dbStatus)
      }
    }, [db, dbStatus])

  return {
    ingredients,
    loading,
    selectIngredients,
  }
}
