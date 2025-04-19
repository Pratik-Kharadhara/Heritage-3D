import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
});

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  userId: integer("user_id").notNull(),
  modelUrl: text("model_url"),
  imageUrl: text("image_url"),
  createdAt: text("created_at").notNull(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  rating: text("rating"),
  reviewCount: integer("review_count"),
  featured: boolean("featured"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

export const insertModelSchema = createInsertSchema(models).omit({
  id: true,
  userId: true,
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Model = typeof models.$inferSelect;
export type Tour = typeof tours.$inferSelect;
