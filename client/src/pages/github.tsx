import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Github, Plus, ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GitHubUser {
  login: string;
  email?: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description?: string;
  private: boolean;
  html_url: string;
  updated_at: string;
}

export default function GitHubPage() {
  const { toast } = useToast();
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ['/api/github/user'],
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ['/api/github/repos'],
  });

  const createRepoMutation = useMutation({
    mutationFn: async (data: { name: string; description: string; private: boolean }) => {
      const response = await apiRequest('POST', '/api/github/repos', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/github/repos'] });
      toast({
        title: "Repository created!",
        description: "Your new repository has been created successfully.",
      });
      setRepoName("");
      setRepoDescription("");
      setIsPrivate(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoName.trim()) {
      toast({
        title: "Error",
        description: "Repository name is required",
        variant: "destructive",
      });
      return;
    }
    createRepoMutation.mutate({
      name: repoName.trim(),
      description: repoDescription.trim(),
      private: isPrivate,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Github className="h-8 w-8" data-testid="icon-github" />
        <h1 className="text-3xl font-bold" data-testid="text-page-title">GitHub Integration</h1>
      </div>

      {userLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-60" />
          </CardContent>
        </Card>
      ) : user ? (
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-connected-user">Connected as {user.login}</CardTitle>
            <CardDescription data-testid="text-user-email">{user.email || 'No email available'}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Repository
          </CardTitle>
          <CardDescription>
            Create a new GitHub repository for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateRepo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-name">Repository Name</Label>
              <Input
                id="repo-name"
                data-testid="input-repo-name"
                placeholder="my-awesome-project"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repo-description">Description (optional)</Label>
              <Input
                id="repo-description"
                data-testid="input-repo-description"
                placeholder="A brief description of your project"
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                data-testid="checkbox-private"
                checked={isPrivate}
                onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
              />
              <Label htmlFor="private" className="cursor-pointer">
                Make this repository private
              </Label>
            </div>
            <Button
              type="submit"
              data-testid="button-create-repo"
              disabled={createRepoMutation.isPending}
            >
              {createRepoMutation.isPending ? "Creating..." : "Create Repository"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Repositories</CardTitle>
          <CardDescription>
            Recent repositories from your GitHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reposLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : repos && repos.length > 0 ? (
            <div className="space-y-3">
              {repos.slice(0, 10).map((repo) => (
                <Card key={repo.id} className="hover-elevate" data-testid={`card-repo-${repo.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg truncate" data-testid={`text-repo-name-${repo.id}`}>
                            {repo.name}
                          </h3>
                          {repo.private && (
                            <Badge variant="secondary" data-testid={`badge-private-${repo.id}`}>
                              Private
                            </Badge>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-sm text-muted-foreground mt-1" data-testid={`text-repo-description-${repo.id}`}>
                            {repo.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        data-testid={`button-view-repo-${repo.id}`}
                      >
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-repos">
              No repositories found. Create your first one above!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
