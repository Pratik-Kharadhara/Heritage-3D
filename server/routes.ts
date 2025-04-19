import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { models as modelsSchema, tours as toursSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // 3D Models API routes
  app.get("/api/models", async (req, res, next) => {
    try {
      const models = await storage.getAllModels();
      res.json(models);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/models/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid model ID" });
      }
      
      const model = await storage.getModel(id);
      if (!model) {
        return res.status(404).json({ message: "Model not found" });
      }
      
      res.json(model);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/models", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const newModel = {
        ...req.body,
        userId: req.user.id,
        createdAt: new Date().toISOString()
      };
      
      const model = await storage.createModel(newModel);
      res.status(201).json(model);
    } catch (error) {
      next(error);
    }
  });

  // Virtual Tours API routes
  app.get("/api/tours", async (req, res, next) => {
    try {
      const tours = await storage.getAllTours();
      res.json(tours);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/tours/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tour ID" });
      }
      
      const tour = await storage.getTour(id);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      
      res.json(tour);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/tours", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const tour = await storage.createTour(req.body);
      res.status(201).json(tour);
    } catch (error) {
      next(error);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
