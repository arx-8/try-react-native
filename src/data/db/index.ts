import SQLite3Database from "better-sqlite3"
import { Generated, Kysely, SqliteDialect } from "kysely"

type Classification = "meat" | "fish" | "vegetable"

export type Database = {
  ingredients: {
    classification: Classification
    id: Generated<number>
    name: string
  }
}

export const connectDB = (): Kysely<Database> => {
  return new Kysely({
    dialect: new SqliteDialect({
      database: new SQLite3Database("app.db"),
    }),
    log: (event) => {
      if (event.level === "query") {
        console.log(event.query.sql)
        console.log(event.query.parameters)
      }
    },
  })
}
