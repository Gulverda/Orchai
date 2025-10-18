import { Button } from "@/components/ui/button";
import { Terminal, Sparkles, Boxes } from "lucide-react";

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">AI-Powered DevOps Automation</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Orchestrator AI
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Transform your monorepo into production-ready containers in seconds. 
          AI analyzes your code and generates optimized Dockerfiles automatically.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            size="lg"
            className="group bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-300"
            onClick={onGetStarted}
          >
            <Terminal className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Start Analysis
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-primary/20 hover:bg-primary/10 hover:border-primary/40"
          >
            <Boxes className="mr-2 h-5 w-5" />
            View Documentation
          </Button>
        </div>

        {/* Terminal Preview */}
        <div className="mt-12 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-primary/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-accent" />
            </div>
            <span className="text-sm text-muted-foreground ml-2">orchestrator-ai</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">orchestrator-ai analyze https://github.com/demo/monorepo</span>
            </div>
            <div className="text-muted-foreground">→ Cloning repository...</div>
            <div className="text-muted-foreground">→ Analyzing code structure...</div>
            <div className="text-accent">✓ Found React Frontend + Node.js Backend</div>
            <div className="text-muted-foreground">→ Consulting AI for architecture...</div>
            <div className="text-accent">✓ Generated optimized Dockerfiles</div>
            <div className="text-accent">✓ Created docker-compose.yml</div>
            <div className="flex items-center gap-2 text-primary">
              <span>Ready to deploy</span>
              <span className="animate-terminal-blink">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
