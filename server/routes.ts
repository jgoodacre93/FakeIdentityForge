import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateProfilesSchema } from "@shared/schema";
import { generateMultipleProfiles } from "../client/src/lib/identity-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate new identity profiles
  app.post("/api/profiles/generate", async (req, res) => {
    try {
      const { count, options } = generateProfilesSchema.parse(req.body);
      
      // Generate profiles using the client-side generator
      const generatedProfiles = generateMultipleProfiles(count, options);
      
      // Store all generated profiles
      const storedProfiles = [];
      for (const profile of generatedProfiles) {
        const stored = await storage.createIdentityProfile(profile);
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
