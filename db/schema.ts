import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const trafficVisitors = sqliteTable("traffic_visitors", {
  id: text("id").primaryKey(), lastSeen: integer("last_seen").notNull(), sessions: integer("sessions").notNull(),
});
export const trafficEvents = sqliteTable("traffic_events", {
  id: text("id").primaryKey(), path: text("path").notNull(), created: integer("created").notNull(),
}, (table) => [index("traffic_events_path_idx").on(table.path)]);

export const suggestions = sqliteTable("suggestions", {
  id: text("id").primaryKey(),
  sourcePath: text("source_path").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  comment: text("comment").notNull(),
  anonymous: integer("anonymous", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at").notNull(),
}, (table) => [index("suggestions_created_at_idx").on(table.createdAt)]);
