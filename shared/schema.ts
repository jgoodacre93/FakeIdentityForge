import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const identityProfiles = pgTable("identity_profiles", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  age: integer("age").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  birthGender: text("birth_gender").notNull(),
  genderIdentity: text("gender_identity").notNull(),
  pronouns: text("pronouns").notNull(),
  sexualOrientation: text("sexual_orientation").notNull(),
  ethnicity: text("ethnicity").notNull(),
  nationality: text("nationality").notNull(),
  spokenLanguages: text("spoken_languages").notNull(),
  
  // Contact Information
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state"),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull(),
  citizenshipStatus: text("citizenship_status").notNull(),
  
  // Physical Attributes
  height: text("height").notNull(),
  weight: text("weight").notNull(),
  build: text("build").notNull(),
  hairColor: text("hair_color").notNull(),
  eyeColor: text("eye_color").notNull(),
  skinTone: text("skin_tone").notNull(),
  bodyMeasurements: text("body_measurements").notNull(),
  
  // Professional Information
  jobTitle: text("job_title").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  annualIncome: text("annual_income").notNull(),
  
  // Marital Status
  maritalStatus: text("marital_status").notNull(),
  spouseName: text("spouse_name"),
  
  // Online Presence
  linkedinUrl: text("linkedin_url").notNull(),
  twitterUrl: text("twitter_url").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  githubUrl: text("github_url").notNull(),
  onlyfansUrl: text("onlyfans_url").notNull(),
  datingUrl: text("dating_url").notNull(),
  facebookUrl: text("facebook_url").notNull(),
  tiktokUrl: text("tiktok_url").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  discordUrl: text("discord_url").notNull(),
  redditUrl: text("reddit_url").notNull(),
  snapchatUrl: text("snapchat_url").notNull(),
  
  // Health Information
  bloodType: text("blood_type").notNull(),
  medicalConditions: text("medical_conditions").notNull(),
  
  // Banking Information
  bankName: text("bank_name").notNull(),
  accountType: text("account_type").notNull(),
  routingNumber: text("routing_number").notNull(),
  creditScore: text("credit_score").notNull(),
  
  // Credit Card Information
  creditCardNumber: text("credit_card_number").notNull(),
  creditCardType: text("credit_card_type").notNull(),
  creditCardExpiry: text("credit_card_expiry").notNull(),
  creditCardCvv: text("credit_card_cvv").notNull(),
  
  // Criminal Records
  criminalRecord: text("criminal_record").notNull(),
  criminalHistory: text("criminal_history"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIdentityProfileSchema = createInsertSchema(identityProfiles).omit({
  id: true,
  createdAt: true,
});

export type InsertIdentityProfile = z.infer<typeof insertIdentityProfileSchema>;
export type IdentityProfile = typeof identityProfiles.$inferSelect;

// Generation request schema
export const generateProfilesSchema = z.object({
  count: z.number().int().min(1).max(50).default(1),
});

export type GenerateProfilesRequest = z.infer<typeof generateProfilesSchema>;
