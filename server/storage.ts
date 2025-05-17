import { 
  users, 
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject, 
  projects,
  contacts,
  type Contact,
  type InsertContact,
  testimonials,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { log } from "./vite";

// Modify the interface with CRUD methods for all our database entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
}

// PostgreSQL implementation of storage
export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  
  constructor() {
    try {
      const queryClient = postgres(process.env.DATABASE_URL as string);
      this.db = drizzle(queryClient);
      log("Connected to PostgreSQL database", "postgres");
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      throw error;
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await this.db.select().from(projects).orderBy(projects.created_at);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(project).returning();
    return result[0];
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await this.db.update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await this.db.delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(contact).returning();
    return result[0];
  }
  
  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(contacts.created_at);
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return await this.db.select().from(testimonials).orderBy(testimonials.display_order);
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const result = await this.db.select().from(testimonials).where(eq(testimonials.id, id));
    return result[0];
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await this.db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const result = await this.db.update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return result[0];
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await this.db.delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    return result.length > 0;
  }
}

// In-memory storage for fallback/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private testimonials: Map<number, Testimonial>;
  private userId: number;
  private projectId: number;
  private contactId: number;
  private testimonialId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contacts = new Map();
    this.testimonials = new Map();
    this.userId = 1;
    this.projectId = 1;
    this.contactId = 1;
    this.testimonialId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const now = new Date();
    const newProject: Project = { ...project, id, created_at: now };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject: Project = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const now = new Date();
    const newContact: Contact = { ...contact, id, created_at: now };
    this.contacts.set(id, newContact);
    return newContact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const now = new Date();
    const display_order = testimonial.display_order || Array.from(this.testimonials.values()).length + 1;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id, 
      created_at: now,
      display_order
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    if (!existingTestimonial) return undefined;
    
    const updatedTestimonial: Testimonial = { ...existingTestimonial, ...testimonial };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }
}

// Choose which storage implementation to use
// Use PostgreSQL if the DATABASE_URL environment variable is set, otherwise use in-memory storage
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
