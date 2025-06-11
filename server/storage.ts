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
      id,
      fullName: insertProfile.fullName,
      firstName: insertProfile.firstName,
      lastName: insertProfile.lastName,
      age: insertProfile.age,
      dateOfBirth: insertProfile.dateOfBirth,
      birthGender: insertProfile.birthGender,
      genderIdentity: insertProfile.genderIdentity,
      pronouns: insertProfile.pronouns,
      sexualOrientation: insertProfile.sexualOrientation,
      ethnicity: insertProfile.ethnicity,
      nationality: insertProfile.nationality,
      email: insertProfile.email,
      phone: insertProfile.phone,
      address: insertProfile.address,
      city: insertProfile.city,
      state: insertProfile.state || null,
      zipCode: insertProfile.zipCode,
      country: insertProfile.country,
      citizenshipStatus: insertProfile.citizenshipStatus,
      height: insertProfile.height,
      weight: insertProfile.weight,
      build: insertProfile.build,
      hairColor: insertProfile.hairColor,
      eyeColor: insertProfile.eyeColor,
      skinTone: insertProfile.skinTone,
      bodyMeasurements: insertProfile.bodyMeasurements,
      jobTitle: insertProfile.jobTitle,
      company: insertProfile.company,
      industry: insertProfile.industry,
      annualIncome: insertProfile.annualIncome,
      maritalStatus: insertProfile.maritalStatus,
      spouseName: insertProfile.spouseName ?? null,
      linkedinUrl: insertProfile.linkedinUrl,
      twitterUrl: insertProfile.twitterUrl,
      instagramUrl: insertProfile.instagramUrl,
      githubUrl: insertProfile.githubUrl,
      onlyfansUrl: insertProfile.onlyfansUrl,
      datingUrl: insertProfile.datingUrl,
      bloodType: insertProfile.bloodType,
      medicalConditions: insertProfile.medicalConditions,
      bankName: insertProfile.bankName,
      accountType: insertProfile.accountType,
      routingNumber: insertProfile.routingNumber,
      creditScore: insertProfile.creditScore,
      criminalRecord: insertProfile.criminalRecord,
      criminalHistory: insertProfile.criminalHistory ?? null,
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
