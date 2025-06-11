import { 
  identityProfiles, 
  type IdentityProfile, 
  type InsertIdentityProfile 
} from "@shared/schema";

export interface IStorage {
  getIdentityProfile(id: number): Promise<IdentityProfile | undefined>;
  createIdentityProfile(profile: InsertIdentityProfile): Promise<IdentityProfile>;
  getRecentProfiles(limit: number): Promise<IdentityProfile[]>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, IdentityProfile>;
  private currentId: number;

  constructor() {
    this.profiles = new Map();
    this.currentId = 1;
  }

  async getIdentityProfile(id: number): Promise<IdentityProfile | undefined> {
    return this.profiles.get(id);
  }

  async createIdentityProfile(insertProfile: InsertIdentityProfile): Promise<IdentityProfile> {
    const id = this.currentId++;
    const profile: IdentityProfile = { 
      ...insertProfile, 
      id,
      createdAt: new Date()
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async getRecentProfiles(limit: number): Promise<IdentityProfile[]> {
    const allProfiles = Array.from(this.profiles.values());
    return allProfiles
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
