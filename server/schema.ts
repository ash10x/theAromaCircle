import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { use } from "react";

export const fragrances = pgTable("fragrances", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  brand: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  images: varchar({ length: 255 }).array().notNull(),
  category: varchar({ length: 255 }).notNull(),
  rating: integer().notNull(),
  quantity: integer().notNull(),
  size: integer().notNull(),
});

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_name: integer().notNull(),
  user_email: varchar({ length: 255 }).notNull(),
  user_address: varchar({ length: 255 }).notNull(),
  user_phone: varchar({ length: 255 }).notNull(),
  fragrance_id: integer().notNull(),
  quantity: integer().notNull(),
  total_price: integer().notNull(),
  status: varchar({ length: 255 }).notNull(),
  created_at: integer().notNull(),
});

export const messages = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
  created_at: integer().notNull(),
});
