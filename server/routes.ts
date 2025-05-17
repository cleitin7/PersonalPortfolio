import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertContactSchema, insertTestimonialSchema } from "@shared/schema";
import { z } from "zod";

// Project routes
async function registerProjectRoutes(app: Express) {
  // Get all projects
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Get a single project by ID
  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  // Create a new project
  app.post('/api/projects', async (req, res) => {
    try {
      const validationResult = insertProjectSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid project data', 
          details: validationResult.error.errors 
        });
      }

      const newProject = await storage.createProject(validationResult.data);
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  // Update an existing project
  app.patch('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      // Partial validation - only validate the fields that are provided
      const partialSchema = insertProjectSchema.partial();
      const validationResult = partialSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid project data', 
          details: validationResult.error.errors 
        });
      }

      const updatedProject = await storage.updateProject(id, validationResult.data);
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  // Delete a project
  app.delete('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }

      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });
}

// Contact routes
async function registerContactRoutes(app: Express) {
  // Submit a contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const validationResult = insertContactSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid contact data', 
          details: validationResult.error.errors 
        });
      }

      const newContact = await storage.createContact(validationResult.data);
      res.status(201).json({ success: true, id: newContact.id });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // Get all contact submissions (admin only)
  app.get('/api/contact', async (req, res) => {
    try {
      // TODO: Add authentication/authorization middleware
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });
}

// Testimonial routes
async function registerTestimonialRoutes(app: Express) {
  // Get all testimonials
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  // Get a single testimonial by ID
  app.get('/api/testimonials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid testimonial ID' });
      }

      const testimonial = await storage.getTestimonial(id);
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.json(testimonial);
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      res.status(500).json({ error: 'Failed to fetch testimonial' });
    }
  });

  // Create a new testimonial
  app.post('/api/testimonials', async (req, res) => {
    try {
      // TODO: Add authentication/authorization middleware
      const validationResult = insertTestimonialSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid testimonial data', 
          details: validationResult.error.errors 
        });
      }

      const newTestimonial = await storage.createTestimonial(validationResult.data);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
    }
  });

  // Update an existing testimonial
  app.patch('/api/testimonials/:id', async (req, res) => {
    try {
      // TODO: Add authentication/authorization middleware
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid testimonial ID' });
      }

      // Partial validation - only validate the fields that are provided
      const partialSchema = insertTestimonialSchema.partial();
      const validationResult = partialSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid testimonial data', 
          details: validationResult.error.errors 
        });
      }

      const updatedTestimonial = await storage.updateTestimonial(id, validationResult.data);
      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.json(updatedTestimonial);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(500).json({ error: 'Failed to update testimonial' });
    }
  });

  // Delete a testimonial
  app.delete('/api/testimonials/:id', async (req, res) => {
    try {
      // TODO: Add authentication/authorization middleware
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid testimonial ID' });
      }

      const success = await storage.deleteTestimonial(id);
      if (!success) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running!' });
  });

  // Register all routes
  await registerProjectRoutes(app);
  await registerContactRoutes(app);
  await registerTestimonialRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
