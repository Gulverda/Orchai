import { Bot, Zap, Shield, GitBranch, Layers, Sparkles } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description: "Advanced AI analyzes your codebase structure and dependencies to generate optimal Docker configurations"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Complete analysis and generation in seconds. No manual configuration needed"
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Multi-stage builds, security best practices, and optimized layer caching built-in"
  },
  {
    icon: GitBranch,
    title: "Monorepo Support",
    description: "Intelligently handles complex monorepo structures with multiple services"
  },
  {
    icon: Layers,
    title: "Multi-Service",
    description: "Generates complete docker-compose configurations for frontend, backend, and databases"
  },
  {
    icon: Sparkles,
    title: "Smart Optimization",
    description: "Automatic detection of frameworks and optimization of build processes"
  }
];

const Features = () => {
  return (
    <div className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Why Orchestrator AI?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automate your Docker workflow with intelligent code analysis and generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.2)]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
