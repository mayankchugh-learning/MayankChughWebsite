import { db } from "./db";
import {
  profile,
  experiences,
  projects,
  skills,
  messages,
  chat_sessions,
  chat_messages,
  type Profile,
  type Experience,
  type Project,
  type Skill,
  type InsertMessage,
  type ChatSession,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createMessage(message: InsertMessage): Promise<void>;
  // Chat
  createChatSession(email?: string): Promise<ChatSession>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: number): Promise<ChatMessage[]>;
  // Seeding methods
  seedProfile(data: any): Promise<void>;
  seedExperiences(data: any[]): Promise<void>;
  seedProjects(data: any[]): Promise<void>;
  seedSkills(data: any[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [data] = await db.select().from(profile).limit(1);
    return data;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.order);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async createChatSession(email?: string): Promise<ChatSession> {
    const [session] = await db.insert(chat_sessions).values({ email }).returning();
    return session;
  }

  async addChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [msg] = await db.insert(chat_messages).values(message).returning();
    return msg;
  }

  async getChatHistory(sessionId: number): Promise<ChatMessage[]> {
    return await db.select().from(chat_messages).where(eq(chat_messages.sessionId, sessionId)).orderBy(chat_messages.createdAt);
  }

  async seedProfile(data: any): Promise<void> {
    const existing = await this.getProfile();
    if (!existing) {
      await db.insert(profile).values(data);
    }
  }

  async seedExperiences(data: any[]): Promise<void> {
    const existing = await this.getExperiences();
    if (existing.length === 0) {
      await db.insert(experiences).values(data);
    }
  }

  async seedProjects(data: any[]): Promise<void> {
    const existing = await this.getProjects();
    if (existing.length === 0) {
      await db.insert(projects).values(data);
    }
  }

  async seedSkills(data: any[]): Promise<void> {
    const existing = await this.getSkills();
    if (existing.length === 0) {
      await db.insert(skills).values(data);
    }
  }
}

export const storage = new DatabaseStorage();
