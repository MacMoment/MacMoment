import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import GitHubPage from "@/pages/github";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Github, Briefcase } from "lucide-react";

function Navigation() {
  const [location] = useLocation();
  
  return (
    <nav className="border-b">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant={location === "/" ? "default" : "ghost"}
            size="sm"
            asChild
            data-testid="link-portfolio"
          >
            <Link href="/">
              <Briefcase className="h-4 w-4 mr-2" />
              Portfolio
            </Link>
          </Button>
          <Button
            variant={location === "/github" ? "default" : "ghost"}
            size="sm"
            asChild
            data-testid="link-github"
          >
            <Link href="/github">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Navigation />
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/github" component={GitHubPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
