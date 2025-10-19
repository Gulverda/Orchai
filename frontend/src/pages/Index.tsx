import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Sidebar } from '@/components/Sidebar';
import { HeroSection } from '@/components/HeroSection';
import { CodeBlock } from '@/components/CodeBlock';
import { Shield } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'getting-started', 'how-it-works', 'api-reference', 'examples', 'security'];

      // If we're at (or very near) the bottom, force-select the last section
      const nearBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 4);
      if (nearBottom) {
        setActiveSection('security');
        return;
      }

      const scrollPosition = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const isLastSection = i === sections.length - 1;
          
          // For last section, activate if we've scrolled past its start
          if (isLastSection && scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            break;
          }
          
          // For other sections, check if we're within the section bounds
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const installCode = `npm install orchestrator-ai`;

  const quickStartCode = `import { OrchestratorAI } from 'orchestrator-ai';

const orchestrator = new OrchestratorAI({
  apiUrl: 'http://localhost:3001',
  geminiApiKey: process.env.GEMINI_API_KEY
});

// Analyze your repository
const analysis = await orchestrator.analyze(
  'https://github.com/your-org/monorepo'
);

// Generate configuration
const config = await orchestrator.generateConfig(analysis);

// Setup environment
await orchestrator.setupEnvironment(config);`;

  const analyzeExample = `const result = await orchestrator.analyze('https://github.com/org/repo');

// Returns:
{
  services: [
    {
      name: 'frontend',
      type: 'react',
      port: 3000,
      dependencies: ['@mui/material', 'axios']
    },
    {
      name: 'api',
      type: 'nodejs',
      port: 3001,
      databases: ['postgresql'],
      caches: ['redis']
    }
  ],
  databases: [
    { type: 'postgresql', port: 5432, version: '14' }
  ],
  messaging: ['redis'],
  architecture: 'microservices-with-monorepo'
}`;

  const envVars = `# AI Analysis
GEMINI_API_KEY=your_api_key_here

# Backend API
VITE_API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@db:5432/app
REDIS_URL=redis://cache:6379

# Service Ports (auto-detected)
FRONTEND_PORT=3000
API_PORT=3001
WORKER_PORT=3002`;

  const cliExample = `# 1. Analyze your repository
orchestrator-ai analyze ./my-monorepo

# 2. Detected services:
# ✓ Frontend (React) - Port 3000
# ✓ API (Node.js) - Port 3001
# ✓ Database (PostgreSQL) - Port 5432
# ✓ Cache (Redis) - Port 6379

# 3. Setup environment
orchestrator-ai setup

# 4. Start everything
docker-compose up`;

  return (
    <div className="min-h-screen bg-gradient-subtle bg-gradient-animated">
      <Navigation onNavigate={scrollToSection} />
      
      <div className="flex pt-16">
        <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-5xl mx-auto">
            <HeroSection />

            {/* Getting Started */}
            <section id="getting-started" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Getting Started</h2>
              
              <div className="space-y-8">
                <div className="glass rounded-lg p-6 border border-border">
                  <h3 className="text-2xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Node.js 16+
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Docker & Docker Compose
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Git
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> GEMINI_API_KEY environment variable
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Installation</h3>
                  <CodeBlock code={installCode} language="bash" id="install" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Quick Start</h3>
                  <CodeBlock code={quickStartCode} language="javascript" id="quickstart" />
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">How It Works</h2>
              
              <div className="grid gap-6">
                {[
                  {
                    number: 1,
                    title: 'Code Intelligence',
                    description: 'The system scans your monorepo and automatically detects:',
                    items: [
                      'Frontend Frameworks: React, Vue, Angular',
                      'Backend Services: Node.js, Java (Spring Boot), Python (FastAPI), Go',
                      'Databases: PostgreSQL, MongoDB, MySQL, Redis',
                      'Message Queues: RabbitMQ, Kafka, Redis',
                      'Connection Ports and environment variables',
                      'Dependencies and their versions'
                    ]
                  },
                  {
                    number: 2,
                    title: 'Architecture Inference',
                    description: 'AI leverages Google Gemini 1.5 Pro\'s 1M token context window to understand your architecture:',
                    diagram: `Client (React) → API Gateway (Node.js) → Services (Python)
                   ↓
         PostgreSQL + Redis Cache`
                  },
                  {
                    number: 3,
                    title: 'Auto-Generated Configuration',
                    description: 'Creates everything you need:',
                    items: [
                      'Optimized Dockerfiles for each service',
                      'docker-compose.yml with network configuration',
                      'CI/CD workflows (GitHub Actions / GitLab CI)',
                      'Environment variable templates',
                      'Health checks and monitoring'
                    ]
                  }
                ].map((step) => (
                  <div key={step.number} className="glass rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step.number === 1 ? 'bg-primary' : step.number === 2 ? 'bg-secondary' : 'bg-accent'
                      }`}>
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    {step.items && (
                      <ul className="space-y-2">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.diagram && (
                      <pre className="bg-card/50 p-4 rounded-lg font-mono text-sm text-muted-foreground whitespace-pre">
                        {step.diagram}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">API Reference</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">analyze(repoUrl)</h3>
                  <p className="text-muted-foreground mb-4">
                    Analyzes a repository and returns detected services, databases, and architecture.
                  </p>
                  <CodeBlock code={analyzeExample} language="javascript" id="analyze" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">generateConfig(analysis)</h3>
                  <p className="text-muted-foreground mb-4">
                    Creates complete configuration based on your codebase analysis.
                  </p>
                  <div className="glass rounded-lg p-6 border border-border">
                    <p className="font-medium mb-2">Generates:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• services/frontend/Dockerfile</li>
                      <li>• services/api/Dockerfile</li>
                      <li>• docker-compose.yml</li>
                      <li>• .github/workflows/ci.yml</li>
                      <li>• .env.example</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">setupEnvironment(config)</h3>
                  <p className="text-muted-foreground">
                    Deploys all files and configurations to your project directory.
                  </p>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Examples</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">CLI Usage</h3>
                  <CodeBlock code={cliExample} language="bash" id="cli" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Environment Variables</h3>
                  <CodeBlock code={envVars} language="bash" id="env" />
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Security</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Encrypted Storage', description: 'API keys and secrets are encrypted at rest' },
                  { title: 'Vulnerability Scanning', description: 'Automated dependency security checks' },
                  { title: 'Minimal Permissions', description: 'Only required access permissions' },
                  { title: 'OWASP Compliance', description: 'Follows OWASP Top 10 best practices' }
                ].map((item) => (
                  <div key={item.title} className="glass rounded-lg p-6 border border-border">
                    <Shield className="h-6 w-6 text-success mb-3" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground text-sm">
                  © 2024 Orch AI. MIT License.
                </p>
                <div className="flex gap-6">
                  <a href="https://github.com/orchestrator-ai" className="text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </a>
                  <a href="https://docs.orchestrator-ai.dev" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                  <a href="https://discord.gg/orchestrator-ai" className="text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
