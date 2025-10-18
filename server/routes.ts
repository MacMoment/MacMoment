import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableGitHubClient } from "./github";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API routes
  
  // Get current GitHub user
  app.get("/api/github/user", async (req, res) => {
    try {
      const octokit = await getUncachableGitHubClient();
      const { data } = await octokit.rest.users.getAuthenticated();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // List user repositories
  app.get("/api/github/repos", async (req, res) => {
    try {
      const octokit = await getUncachableGitHubClient();
      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100
      });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new repository
  app.post("/api/github/repos", async (req, res) => {
    try {
      const { name, description, private: isPrivate } = req.body;
      const octokit = await getUncachableGitHubClient();
      const { data } = await octokit.rest.repos.createForAuthenticatedUser({
        name,
        description: description || '',
        private: isPrivate || false,
        auto_init: true
      });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get repository details
  app.get("/api/github/repos/:owner/:repo", async (req, res) => {
    try {
      const { owner, repo } = req.params;
      const octokit = await getUncachableGitHubClient();
      const { data } = await octokit.rest.repos.get({
        owner,
        repo
      });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
