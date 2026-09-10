import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const trafficVisitors = sqliteTable("traffic_visitors", {
  id: text("id").primaryKey(), lastSeen: integer("last_seen").notNull(), sessions: integer("sessions").notNull(),
});
export const trafficEvents = sqliteTable("traffic_events", {
  id: text("id").primaryKey(), path: text("path").notNull(), created: integer("created").notNull(),
}, (table) => [index("traffic_events_path_idx").on(table.path)]);
