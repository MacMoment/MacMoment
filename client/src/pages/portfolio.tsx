import { useState, useEffect } from "react";
import { Code2, Database, Server, Zap, Mail, MessageSquare, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, useScroll } from "framer-motion";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import type { Project, Skill } from "@shared/schema";

const projects: Project[] = [
  {
    id: "macac",
    title: "MacAC",
    subtitle: "Advanced Anti-Cheat System",
    description: "Comprehensive anti-cheat using multi-layered detection, real-time packet analysis, and intelligent behavioral monitoring for game servers.",
    techStack: ["C++", "Assembly", "Networking"],
    metrics: [
      { label: "Accuracy", value: "99.7%", color: "text-chart-3" },
      { label: "False Positives", value: "<0.1%", color: "text-chart-1" },
      { label: "Detection", value: "Sub-1ms", color: "text-chart-2" },
    ],
    featured: true,
  },
  {
    id: "macrefunds",
    title: "MacRefunds",
    subtitle: "JDA-Integrated Refund Plugin",
    description: "A plugin integrated with JDA to issue in-game refunds via Discord or in-game commands, backed by an efficient database for secure transaction logging.",
    techStack: ["Java", "JDA", "SQL"],
    metrics: [
      { label: "Discord", value: "Integration", color: "text-chart-1" },
      { label: "Database", value: "Secure", color: "text-chart-3" },
      { label: "API", value: "JDA Powered", color: "text-chart-2" },
    ],
    featured: true,
  },
  {
    id: "cloudguard",
    title: "CloudGuard",
    subtitle: "Distributed DDoS Mitigation System",
    description: "Real-time distributed denial-of-service protection using machine learning pattern recognition and automated traffic filtering across multiple nodes.",
    techStack: ["Go", "Redis", "TensorFlow", "Docker"],
    metrics: [
      { label: "Uptime", value: "99.99%", color: "text-chart-3" },
      { label: "Traffic/s", value: "1M+", color: "text-chart-1" },
      { label: "Mitigation", value: "<500ms", color: "text-chart-2" },
    ],
    featured: true,
  },
  {
    id: "macauctions",
    title: "MacAuctions",
    subtitle: "Real-time Auction House Plugin",
    description: "Feature-rich auction house system with real-time bidding, category filtering, and automated escrow transactions for Minecraft servers.",
    techStack: ["Java", "MySQL", "Redis", "WebSocket"],
    metrics: [
      { label: "Concurrent", value: "5K Users", color: "text-chart-1" },
      { label: "Transactions", value: "100K+", color: "text-chart-3" },
      { label: "Response", value: "<10ms", color: "text-chart-2" },
    ],
    featured: false,
  },
  {
    id: "neuralnpc",
    title: "NeuralNPC",
    subtitle: "AI-Powered NPC Behavior System",
    description: "Machine learning-driven NPC behavior engine with dynamic pathfinding, contextual dialogue, and adaptive difficulty scaling for enhanced gameplay.",
    techStack: ["Python", "PyTorch", "C++", "Rust"],
    metrics: [
      { label: "AI Models", value: "15+", color: "text-chart-2" },
      { label: "Learning", value: "Real-time", color: "text-chart-1" },
      { label: "Accuracy", value: "94%", color: "text-chart-3" },
    ],
    featured: false,
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    subtitle: "Modern Web Portfolio",
    description: "A stunning, dark-themed portfolio showcasing development skills through implementation. Built with modern web technologies and smooth animations.",
    techStack: ["TypeScript", "React", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { label: "Performance", value: "A+", color: "text-chart-3" },
      { label: "Responsive", value: "100%", color: "text-chart-1" },
      { label: "Animations", value: "Smooth", color: "text-chart-2" },
    ],
    featured: false,
  },
];

const skills: Skill[] = [
  { name: "Java", category: "language", proficiency: 98 },
  { name: "TypeScript", category: "language", proficiency: 95 },
  { name: "C++", category: "language", proficiency: 92 },
  { name: "Python", category: "language", proficiency: 90 },
  { name: "Go", category: "language", proficiency: 88 },
  { name: "Rust", category: "language", proficiency: 85 },
  { name: "JavaScript", category: "language", proficiency: 96 },
  { name: "Assembly", category: "language", proficiency: 78 },
  
  { name: "JDA (Discord)", category: "plugin", proficiency: 97 },
  { name: "Discord Integration", category: "plugin", proficiency: 96 },
  { name: "Spigot/Paper API", category: "plugin", proficiency: 95 },
  { name: "Bukkit Development", category: "plugin", proficiency: 94 },
  { name: "Plugin Architecture", category: "plugin", proficiency: 93 },
  { name: "Event Systems", category: "plugin", proficiency: 92 },
  { name: "Custom Commands", category: "plugin", proficiency: 96 },
  
  { name: "SQL", category: "database", proficiency: 93 },
  { name: "MySQL", category: "database", proficiency: 94 },
  { name: "PostgreSQL", category: "database", proficiency: 91 },
  { name: "Redis", category: "database", proficiency: 89 },
  { name: "MongoDB", category: "database", proficiency: 87 },
  { name: "Database Design", category: "database", proficiency: 92 },
  { name: "Query Optimization", category: "database", proficiency: 90 },
  
  { name: "React", category: "web", proficiency: 94 },
  { name: "Node.js", category: "web", proficiency: 95 },
  { name: "API Development", category: "web", proficiency: 96 },
  { name: "REST APIs", category: "web", proficiency: 95 },
  { name: "WebSocket", category: "web", proficiency: 91 },
  { name: "GraphQL", category: "web", proficiency: 88 },
  { name: "Microservices", category: "web", proficiency: 90 },
  { name: "Docker", category: "web", proficiency: 89 },
  { name: "Tailwind CSS", category: "web", proficiency: 93 },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["home", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("macmomentsp@icloud.com");
    setCopied(true);
    toast({
      title: "Email copied!",
      description: "macmomentsp@icloud.com has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-display text-xl font-bold">
              <span className="text-primary">Mac</span>
              <span className="text-foreground">Moment</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {["home", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors capitalize hover-elevate px-3 py-2 rounded-md ${
                    activeSection === section ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={`link-${section}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10 animate-gradient bg-[length:400%_400%]" />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 text-sm px-4 py-2 border-primary/50">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Available for Projects
            </Badge>
          </motion.div>

          <motion.h1 
            className="font-display text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">Mac</span>
            <span className="text-primary">Moment</span>
          </motion.h1>

          <motion.div 
            className="relative inline-block mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-muted-foreground">
              Plugin Expert & Web Developer
            </h2>
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Crafting advanced anti-cheat systems, Discord integrations, and modern web applications with precision and expertise.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group"
              data-testid="button-view-projects"
            >
              View Projects
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
      </section>

      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing expertise in plugin development, anti-cheat systems, and modern web applications.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => (
              <AnimatedCard key={project.id} index={index}>
                <Card
                  className="group relative overflow-hidden border-primary/20 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 h-full bg-card/50 backdrop-blur-sm"
                  data-testid={`card-project-${project.id}`}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h3>
                      <p className="text-sm text-chart-1 font-medium">{project.subtitle}</p>
                    </div>
                    <motion.div 
                      className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Code2 className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background/50 rounded-lg border border-primary/10">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center group/metric" data-testid={`metric-${project.id}-${idx}`}>
                          <div className={`font-mono font-bold text-xl ${metric.color || "text-primary"} group-hover/metric:scale-110 transition-transform`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="font-mono text-xs border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors" data-testid={`badge-tech-${project.id}-${idx}`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-primary/40 transition-all duration-500 group-hover:scale-150" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-chart-2/20 rounded-full blur-2xl translate-y-12 -translate-x-12 group-hover:bg-chart-2/40 transition-all duration-500" />
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <AnimatedCard key={project.id} index={index} delay={0.2}>
                <Card
                  className="group relative overflow-hidden border-primary/20 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-card/50 backdrop-blur-sm"
                  data-testid={`card-project-${project.id}`}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div 
                          className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Server className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                            {project.title}
                          </h3>
                          <p className="text-sm text-chart-1">{project.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="font-mono text-xs border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors" data-testid={`badge-tech-${project.id}-${idx}`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.metrics && (
                      <div className="flex md:flex-col gap-6 md:gap-4 p-4 bg-background/50 rounded-lg border border-primary/10">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center group/metric" data-testid={`metric-${project.id}-${idx}`}>
                            <div className={`font-mono font-bold text-lg ${metric.color || "text-primary"} group-hover/metric:scale-110 transition-transform`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 relative bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized in plugin development with strong foundations in modern web technologies and database design.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["plugin", "language", "database", "web"].map((category, catIndex) => {
              const categorySkills = skills.filter(s => s.category === category);
              const categoryIcons: Record<string, any> = {
                plugin: Code2,
                language: Zap,
                database: Database,
                web: Server,
              };
              const CategoryIcon = categoryIcons[category];

              return (
                <AnimatedCard key={category} index={catIndex}>
                  <Card className="p-6 border-primary/20 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full bg-card/50 backdrop-blur-sm group/skill-card" data-testid={`card-skills-${category}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover/skill-card:bg-primary/20 transition-colors">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold capitalize text-foreground group-hover/skill-card:text-primary transition-colors">
                      {category === "plugin" ? "Plugins" : category === "web" ? "Web Dev" : category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <motion.div 
                        key={skill.name} 
                        data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs text-primary font-mono font-bold">{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 bg-background/80 rounded-full overflow-hidden border border-primary/10">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary via-chart-1 to-chart-2 rounded-full shadow-lg shadow-primary/50"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out through email or Discord.
            </p>
          </AnimatedSection>

          <AnimatedCard>
            <Card className="p-8 md:p-12 border-primary/30 relative overflow-hidden bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="relative space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={copyEmail}
                  className="group w-full sm:w-auto border-primary/30"
                  data-testid="button-copy-email"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {copied ? "Copied!" : "macmomentsp@icloud.com"}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-chart-2/30 hover:border-chart-2/50"
                  data-testid="button-discord"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  @MacMoment
                </Button>
              </div>

              <p className="text-sm text-primary/80">
                {copied ? "Email copied to clipboard!" : "Click the email to copy to clipboard"}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-x-16 translate-y-16" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/20 rounded-full blur-3xl translate-x-16 -translate-y-16" />
            </Card>
          </AnimatedCard>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display font-semibold">
              <span className="text-primary">Mac</span>
              <span className="text-foreground">Moment</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
