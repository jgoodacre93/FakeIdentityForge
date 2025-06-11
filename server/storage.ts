import { 
  identityProfiles, 
  type IdentityProfile, 
  type InsertIdentityProfile 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getIdentityProfile(id: number): Promise<IdentityProfile | undefined>;
  createIdentityProfile(profile: InsertIdentityProfile): Promise<IdentityProfile>;
  getRecentProfiles(limit: number): Promise<IdentityProfile[]>;
  getAllProfiles(): Promise<IdentityProfile[]>;
}

export class DatabaseStorage implements IStorage {
  async getIdentityProfile(id: number): Promise<IdentityProfile | undefined> {
    const [profile] = await db.select().from(identityProfiles).where(eq(identityProfiles.id, id));
    return profile || undefined;
  }

  async createIdentityProfile(insertProfile: InsertIdentityProfile): Promise<IdentityProfile> {
    const [profile] = await db
      .insert(identityProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async getRecentProfiles(limit: number): Promise<IdentityProfile[]> {
    const profiles = await db
      .select()
      .from(identityProfiles)
      .orderBy(desc(identityProfiles.createdAt))
      .limit(limit);
    return profiles;
  }

  async getAllProfiles(): Promise<IdentityProfile[]> {
    const profiles = await db
      .select()
      .from(identityProfiles)
      .orderBy(desc(identityProfiles.createdAt));
    return profiles;
  }
}

export const storage = new DatabaseStorage();
