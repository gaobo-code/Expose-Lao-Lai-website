import { sqliteTable, text, index, uniqueIndex, integer } from "drizzle-orm/sqlite-core";

export const groupTable = sqliteTable("group_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  groupname: text().notNull(),
  groupnumber: text().notNull(),
  groupowner: text().notNull(),
  groupownernumber: text().notNull(),
  order: integer()
});

export const commentTable = sqliteTable("comment_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  reply: text(),
  order: integer()
});

export const configTable = sqliteTable("config_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  attr: text().notNull(),
  value: text().notNull()
});

export const opRecordTable = sqliteTable("op_record_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  createdat: integer({ mode: 'timestamp' }).notNull()
});

export type Group = typeof groupTable.$inferSelect;
export type Comment = typeof commentTable.$inferSelect;
export type Config = typeof configTable.$inferSelect;
