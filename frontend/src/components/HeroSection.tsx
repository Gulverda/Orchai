import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollIndicator } from './ScrollIndicator';

export function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    { type: 'command', text: 'pip orchai analyze https://github.com/username/repo' },
    { type: 'analyzing', text: '🔍 Analyzing repository...' },
    { type: 'success', text: '✓ Found 3 services: React frontend, Node.js backend, Python worker' },
    { type: 'generating', text: '🤖 Generating Docker configurations with AI...' },
    { type: 'success', text: '✓ Created Dockerfiles and docker-compose.yml' },
    { type: 'building', text: '🐳 Building Docker images...' },
    { type: 'success', text: '✓ All services running at http://localhost:3000' }
  ];

  useEffect(() => {
    if (currentStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden scroll-mt-16"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border glow">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium gradient-text">AI-Powered Docker Automation</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Orch-AI</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Transform any codebase into production-ready Docker containers with AI
        </p>

        {/* Terminal Demo Box */}
        <div className="mt-12 glass rounded-lg overflow-hidden shadow-card border border-border max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <span className="text-sm text-muted-foreground ml-2">terminal</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-3 text-left min-h-[300px]">
            {demoSteps.slice(0, currentStep + 1).map((step, index) => (
              <div key={index} className={`flex items-start gap-2 ${
                step.type === 'command' ? 'text-foreground' :
                step.type === 'success' ? 'text-success' :
                step.type === 'analyzing' || step.type === 'generating' || step.type === 'building' ? 'text-muted-foreground animate-pulse-glow' :
                'text-foreground/80'
              }`}>
                {step.type === 'command' && <span className="text-primary">$</span>}
                <span>{step.text}</span>
              </div>
            ))}
            
            {currentStep === demoSteps.length - 1 && (
              <div className="flex items-center gap-2 text-primary pt-2">
                <span className="animate-cursor-blink">_</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
