import { z } from "zod";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics?: {
    label: string;
    value: string;
    color?: string;
  }[];
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "plugin" | "web" | "database" | "language";
  proficiency: number;
}

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    color: z.string().optional(),
  })).optional(),
  featured: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z.string(),
  category: z.enum(["plugin", "web", "database", "language"]),
  proficiency: z.number().min(0).max(100),
});

export type InsertProject = z.infer<typeof projectSchema>;
export type InsertSkill = z.infer<typeof skillSchema>;
