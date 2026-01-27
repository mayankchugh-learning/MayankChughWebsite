import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  resumeUrl: text("resume_url"),
  socialLinks: jsonb("social_links").$type<{ platform: string; url: string; icon: string }[]>().notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(), // For display ordering
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack").array().notNull(),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"), // YouTube link
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'AI/ML', 'Cloud', 'Backend', 'Frontend'
  proficiency: integer("proficiency"), // 1-100
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === TYPES ===

export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
