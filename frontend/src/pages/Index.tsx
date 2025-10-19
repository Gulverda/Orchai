import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Sidebar } from '@/components/Sidebar';
import { HeroSection } from '@/components/HeroSection';
import { CodeBlock } from '@/components/CodeBlock';
import { Shield, Cpu, FileCode, Layers, Package } from 'lucide-react';

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

  const installCode = `# Install from PyPI
pip install orchai==1.0.0`;

const warning_text = `
    "[bold yellow]To run this script, you must install the required packages:[/bold yellow]\n\n"
    "[green]pip install click google-generativeai python-dotenv rich[/green]\n\n"
    "Failure to install these will result in an [bold red]ImportError[/bold red]."`

  const quickStartCode = `# Step 1: Set your Gemini API key
export GEMINI_API_KEY="your_gemini_api_key_here"

# Step 2: Analyze any monorepo
orchai analyze https://github.com/username/project

# That's it! Orch-AI will:
# 1. Clone your repository
# 2. Detect all services (React, Node.js, Python, etc.)
# 3. Generate Docker configurations with AI
# 4. Build and start everything automatically`;

  const analyzeExample = `# orchai analyze detects your stack automatically

📁 Repository Structure:
   ├── frontend/          # React + Vite detected
   │   └── package.json
   ├── backend/           # Node.js + Express detected  
   │   └── package.json
   └── worker/            # Python service detected
       └── requirements.txt

✓ Detected Services:
  • Frontend (React/Vite) - Port 3000
  • Backend (Node.js) - Port 3001  
  • Worker (Python) - Port 8000

🐳 Generated Files:
  • frontend/Dockerfile
  • backend/Dockerfile
  • worker/Dockerfile
  • docker-compose.yml
  • nginx.conf (for React apps)`;

  const envVars = `# Google Gemini AI (required for code analysis)
GEMINI_API_KEY=your_gemini_api_key_here

# Service ports (automatically detected from package.json)
FRONTEND_PORT=3000
BACKEND_PORT=3001
WORKER_PORT=8000

# Database connections (if detected)
DATABASE_URL=postgresql://user:password@localhost:5432/db
REDIS_URL=redis://localhost:6379

# Docker build options
DOCKER_BUILDKIT=1`;

  const cliExample = `$ orchai analyze https://github.com/your-org/monorepo

🔍 Analyzing repository...
✓ Cloned repository
✓ Scanning for services...

📦 Found 3 services:
  • frontend (React + Vite)
  • backend (Node.js + Express)  
  • worker (Python + FastAPI)

🤖 Generating Docker configurations with AI...
✓ Created frontend/Dockerfile
✓ Created backend/Dockerfile
✓ Created worker/Dockerfile
✓ Created docker-compose.yml
✓ Created nginx.conf

🐳 Building Docker images...
✓ Built frontend:latest
✓ Built backend:latest
✓ Built worker:latest

🚀 Starting services...
✓ All services running!

📍 Access your app:
  Frontend: http://localhost:3000
  Backend:  http://localhost:3001
  Worker:   http://localhost:8000`;

  const architectureFlow = `┌─────────────────────────────────────────────────────────────┐
│                     User Input                              │
│         orchai analyze <github-url>                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  orchai.py (CLI Entry Point)                                │
│  - Parses command-line arguments                            │
│  - Validates GitHub URL                                     │
│  - Clones repository to temp directory                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  analyzer.py (Code Detective)                               │
│  - Scans directory tree for package.json                    │
│  - Identifies requirements.txt (Python)                     │
│  - Detects pom.xml (Java), go.mod (Go)                      │
│  - Determines service types (React, Node.js, etc.)          │
│  - Extracts ports, dependencies, framework versions         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  generator.py (Prompt Builder)                              │
│  - Creates structured prompt from analysis                  │
│  - Includes project architecture context                    │
│  - References prompts.py for best practices                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  llm.py (AI Brain - Google Gemini)                          │
│  - Sends prompt to Gemini 1.5 Pro                           │
│  - Uses 1M token context window                             │
│  - Receives JSON response with configs                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  generator.py (Config Writer)                               │
│  - Parses AI response                                       │
│  - Writes Dockerfile for each service                       │
│  - Creates docker-compose.yml                               │
│  - Generates nginx.conf (if needed)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  docker_commands.py (OS-Specific Builder)                   │
│  - Detects user's operating system                          │
│  - Formats commands for PowerShell/Bash                     │
│  - Creates executable scripts                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Docker Build & Deploy                                      │
│  - docker build (builds images)                             │
│  - docker-compose up (starts services)                      │
│  - Success message with URLs                                │
└─────────────────────────────────────────────────────────────┘`;

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
                <div className="glass rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Python 3.11+
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Docker Desktop or Docker Engine
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Git 2.0+
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Google Gemini API Key
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Installation</h3>
                      <div className="warning-block">
                        <div className="warning-header">
                            ⚠️ WARNING: Required Python Packages
                        </div>
                        <div className="warning-content">
                            # Please install the following libraries before running the script:

                            <pre>pip install click google-generativeai python-dotenv rich</pre>

                            # Failure to install these dependencies will result in an ImportError.
                        </div>
                    </div>

                  <CodeBlock code={installCode} language="bash" id="install" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Quick Start</h3>
                  <CodeBlock code={quickStartCode} language="bash" id="quickstart" />
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
                    title: 'Repository Analysis',
                    description: 'Orch-AI scans your codebase to identify services and their configurations',
                    items: [
                      'Detects package.json for Node.js projects',
                      'Identifies requirements.txt for Python services',
                      'Finds pom.xml or build.gradle for Java projects',
                      'Discovers go.mod for Go applications',
                      'Extracts ports and dependencies',
                      'Determines framework types (React, Express, FastAPI, etc.)'
                    ]
                  },
                  {
                    number: 2,
                    title: 'AI-Powered Configuration',
                    description: 'Google Gemini AI generates optimized Docker configurations based on best practices',
                    diagram: architectureFlow
                  },
                  {
                    number: 3,
                    title: 'Automated Deployment',
                    description: 'Builds Docker images and starts all services automatically',
                    items: [
                      'Multi-stage Docker builds for minimal image sizes',
                      'Production-ready configurations with security best practices',
                      'Automatic service networking and orchestration',
                      'Health checks and restart policies',
                      'OS-specific build commands (Windows, Mac, Linux)'
                    ]
                  }
                ].map((step) => (
                  <div key={step.number} className="glass rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step.number === 1 ? 'bg-primary' : step.number === 2 ? 'bg-primary' : 'bg-primary'
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
                      <pre className="bg-card/50 p-4 rounded-lg font-mono text-sm text-muted-foreground whitespace-pre overflow-x-auto">
                        {step.diagram}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">CLI Commands</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Orchai analyze</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete end-to-end analysis and deployment pipeline. Analyzes repository, generates configs, builds images, and starts services.
                  </p>
                  <CodeBlock code={analyzeExample} language="bash" id="analyze" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">orchai inspect</h3>
                  <p className="text-muted-foreground mb-4">
                    Preview mode - analyzes repository structure without generating or building anything.
                  </p>
                  <div className="glass rounded-lg p-6">
                    <p className="font-medium mb-2">What it does:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Scans for service definitions</li>
                      <li>• Identifies technologies and frameworks</li>
                      <li>• Shows detected ports and dependencies</li>
                      <li>• Displays project architecture map</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">orchai generate</h3>
                  <p className="text-muted-foreground mb-4">
                    Generates Docker configurations without building images.
                  </p>
                  <div className="glass rounded-lg p-6">
                    <p className="font-medium mb-2">Generated files:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• services/frontend/Dockerfile</li>
                      <li>• services/api/Dockerfile</li>
                      <li>• docker-compose.yml</li>
                      <li>• nginx.conf (for SPAs)</li>
                      <li>• .env.example</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">orchai commands</h3>
                  <p className="text-muted-foreground">
                    Generates OS-specific Docker commands for Windows (PowerShell), Mac, or Linux (Bash).
                  </p>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="px-6 py-20 scroll-mt-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Real Examples</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">CLI Output Example</h3>
                  <CodeBlock code={cliExample} language="bash" id="cli" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Environment Variables</h3>
                  <CodeBlock code={envVars} language="bash" id="env" />
                </div>

                <div className="glass rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                    <FileCode className="h-6 w-6 text-primary" />
                    Key Project Files
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><code className="text-primary">orchai.py</code> - Main CLI entry point (500+ lines)</p>
                    <p><code className="text-primary">analyzer.py</code> - Repository scanner (80 lines)</p>
                    <p><code className="text-primary">llm.py</code> - Google Gemini interface (25 lines)</p>
                    <p><code className="text-primary">generator.py</code> - Config builder (50 lines)</p>
                    <p><code className="text-primary">prompts.py</code> - AI instruction templates (800+ lines)</p>
                    <p><code className="text-primary">docker_commands.py</code> - Platform-specific scripts (200+ lines)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground text-sm">
                  © 2025 Orch-AI. Built with Google Gemini AI.
                </p>
                <div className="flex gap-6">

                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community
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
