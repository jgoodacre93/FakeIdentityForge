import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateProfilesSchema } from "@shared/schema";
import { generateMultipleProfiles } from "../client/src/lib/identity-generator";
import { generateProfilePhoto } from "./photo-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate new identity profiles
  app.post("/api/profiles/generate", async (req, res) => {
    try {
      const { count } = generateProfilesSchema.parse(req.body);
      
      // Generate profiles using the client-side generator
      const generatedProfiles = generateMultipleProfiles(count);
      
      // Store all generated profiles and generate photos
      const storedProfiles = [];
      for (const profile of generatedProfiles) {
        const stored = await storage.createIdentityProfile(profile);
        
        // Generate photo for the profile
        try {
          console.log(`Generating photo for ${stored.fullName}...`);
          const photoUrl = await generateProfilePhoto(stored);
          if (photoUrl) {
            // Update the profile with the photo URL
            await storage.updateProfilePhoto(stored.id, photoUrl);
            stored.photoUrl = photoUrl;
          }
        } catch (error) {
          console.error(`Failed to generate photo for ${stored.fullName}:`, error);
        }
        
        storedProfiles.push(stored);
      }
      
      res.json(storedProfiles);
    } catch (error) {
      console.error("Error generating profiles:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Failed to generate profiles" 
      });
    }
  });

  // Get recent profiles
  app.get("/api/profiles/recent", async (req, res) => {
    try {
      const profiles = await storage.getRecentProfiles(10);
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching recent profiles:", error);
      res.status(500).json({ message: "Failed to fetch recent profiles" });
    }
  });

  // Get specific profile
  app.get("/api/profiles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid profile ID" });
      }
      
      const profile = await storage.getIdentityProfile(id);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
