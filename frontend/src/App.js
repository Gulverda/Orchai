import React, { useState, useEffect } from "react";
import { Sparkles, Boxes, X, Copy, Check } from "lucide-react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("The response failed.");
        return res.json();
      })
      .then(setItems)
      .catch((err) => {
        console.error("Data fetching error:", err);
        setError("Failed to fetch data. Make sure the server is running.");
      });
  }, [API_URL]);

  const value = items.forEach((item) => {
    <div>
      {" "}
      `Item: ${item.name}, Quantity: ${item.quantity}, ID: ${item._id}`
    </div>;
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const docContent = `# Orch AI - AI-Powered DevOps Automation

## Overview

Orch AI is a revolutionary tool that automatically constructs a complete local and production-ready
environment by analyzing your monorepo's codebase. Simply provide a Git repository URL, 
and watch as our AI understands your architecture and generates Dockerfiles, 
docker-compose configurations, and CI/CD pipelines.

---

## Getting Started

### Requirements

- Node.js 16+
- Docker & Docker Compose
- Git
- \`GEMINI_API_KEY\` environment variable (for AI analysis)

### Installation

\`\`\`bash
npm install orchestrator-ai
\`\`\`

### Quick Start

\`\`\`javascript
import { OrchestratorAI } from 'orchestrator-ai';

const orchestrator = new OrchestratorAI({
  apiUrl: 'http://localhost:3001',
  geminiApiKey: process.env.GEMINI_API_KEY
});

// Analyze your repository
const analysis = await orchestrator.analyze('https://github.com/your-org/monorepo');

// Generate configuration
const config = await orchestrator.generateConfig(analysis);

// Setup environment
await orchestrator.setupEnvironment(config);
\`\`\`

---

##  How It Works

###  Code Intelligence

The system scans your monorepo and automatically detects:

- **Frontend Frameworks**: React, Vue, Angular
- **Backend Services**: Node.js, Java (Spring Boot), Python (FastAPI), Go
- **Databases**: PostgreSQL, MongoDB, MySQL, Redis
- **Message Queues**: RabbitMQ, Kafka, Redis
- **Connection Ports** and environment variables
- **Dependencies** and their versions

**Supported Configuration Files**:
- \`package.json\` - Node.js projects
- \`pom.xml\`, \`build.gradle\` - Java
- \`requirements.txt\`, \`setup.py\` - Python
- \`go.mod\` - Go
- \`Dockerfile\` - Existing configurations

### 2️ Architecture Inference

AI leverages Google Gemini 1.5 Pro's 1M token context window to understand:

\`\`\`
Architecture Pattern:
Client (React) → API Gateway (Node.js) → Services (Python)
                        ↓
              PostgreSQL + Redis Cache
\`\`\`

Code structure is parsed with **Tree-sitter** for accurate AST generation.

### 3️ Auto-Generated Configuration

The system creates everything you need:

#### Dockerfile (Per Service)

\`\`\`dockerfile
# Auto-generated optimized build
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
\`\`\`

#### docker-compose.yml (Orchestration)

- Secure service interconnection
- Network configuration
- Volumes and data persistence
- Environment variables management

#### CI/CD Workflows

- GitHub Actions / GitLab CI templates
- Testing → Build → Push → Deploy pipelines
- Automated security scanning

---

## API Reference

### analyze(repoUrl)

\`\`\`javascript
const result = await orchestrator.analyze('https://github.com/org/repo');

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
}
\`\`\`

### generateConfig(analysis)

Creates complete configuration based on your codebase:

\`\`\`javascript
const config = await orchestrator.generateConfig(analysis);

// Generates:
// - services/frontend/Dockerfile
// - services/api/Dockerfile
// - docker-compose.yml
// - .github/workflows/ci.yml
// - .env.example
\`\`\`

### setupEnvironment(config)

Deploys all files and configurations to your project:

\`\`\`javascript
await orchestrator.setupEnvironment(config);
// Output: "Environment ready! Run: docker-compose up"
\`\`\`

---

## Environment Variables

\`\`\`bash
# AI Analysis
GEMINI_API_KEY=your_api_key_here

# Backend API
REACT_APP_API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@db:5432/app
REDIS_URL=redis://cache:6379

# Service Ports (auto-detected)
FRONTEND_PORT=3000
API_PORT=3001
WORKER_PORT=3002
\`\`\`

---

## Key Features

✅ **Monorepo Intelligence** - Independent code analysis
✅ **Dockerfile Optimization** - Minimal, efficient Docker images
✅ **Docker Compose Orchestration** - All services with one command
✅ **Automated CI/CD** - Testing and deployment workflows
✅ **Security Scanning** - Vulnerability detection
✅ **Health Checks** - Automatic service monitoring
✅ **Environment Management** - Smart variable handling

---

## Real-World Example: React + Node.js + PostgreSQL

\`\`\`bash
# 1. Analyze your repository
orchestrator-ai analyze ./my-monorepo

# 2. Detected services:
# ✓ Frontend (React) - Port 3000
# ✓ API (Node.js) - Port 3001
# ✓ Database (PostgreSQL) - Port 5432
# ✓ Cache (Redis) - Port 6379

# 3. Setup environment
orchestrator-ai setup

# 4. Start everything
docker-compose up

# 5. Result: Your entire application is running!
\`\`\`

---

## Technology Stack

- **LLM Analysis**: Google Gemini 1.5 Pro (1M token context)
- **Code Parsing**: Tree-sitter (AST generation)
- **Container Orchestration**: Docker & Docker Compose
- **CI/CD**: GitHub Actions / GitLab CI
- **Infrastructure APIs**: Docker API, Kubernetes API (optional)

---

## Security

- Encrypted API keys storage
- Vulnerability scanning for dependencies
- Minimal required permissions
- OWASP Top 10 compliance
- Secrets management best practices

---

## Support

For additional documentation and support:
- GitHub: https://github.com/orchestrator-ai
- Documentation: https://docs.orchestrator-ai.dev
- Discord Community: https://discord.gg/orchestrator-ai
- Email: support@orchestrator-ai.dev

---

## License

MIT License - Use freely, modify, or commercialize

**Orch AI - Transform Your Monorepo Into Production-Ready Containers.**`;

  const handleCopy = () => {
    console.log("Copy button clicked");
    navigator.clipboard.writeText(docContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <div className="bg-effect bg-effect-1" />
      <div className="bg-effect bg-effect-2" />

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-tabs">
                <div className="modal-tab active">
                  <span className="tab-icon">📄</span>
                  README.md
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="code-editor">
                <div className="editor-linenumbers">
                  {docContent.split("\n").map((_, i) => (
                    <div key={i} className="linenumber">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="editor-code">
                  <code>{docContent}</code>
                </pre>
              </div>
            </div>

            <div className="modal-footer">
              <button className="copy-button" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="content">
        <div className="badge">
          <Sparkles className="badge-icon" />
          <span className="badge-text">AI-Powered DevOps Automation</span>
        </div>

        <h1 className="heading">
          <span className="heading-gradient">Orch AI</span>
        </h1>

        <p className="description">
          Transform your monorepo into production-ready containers in seconds.{" "}
          <br />
          Backend status and database data displayed below in real-time.
        </p>

        <div className="terminal-box">
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="dot red" />
              <div className="dot yellow" />
              <div className="dot green" />
            </div>
            <span className="terminal-title">orchestrator-ai</span>
          </div>

          <div className="terminal-output">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-text">
                orchestrator-ai analyze {API_URL}
              </span>
            </div>

            {!error && !message && (
              <div className="terminal-loading">→ Connecting to backend...</div>
            )}

            {error && <div className="terminal-error">✗ {error}</div>}

            {message && (
              <div className="terminal-success">✓ Backend: {message}</div>
            )}

            {!error && (
              <>
                <div className="terminal-loading">
                  → Fetching database items...
                </div>
                {items.length > 0 ? (
                  <>
                    <div className="terminal-success">
                      ✓ Received {items.length} items from database
                    </div>
                    {items.map((item) => (
                      <div key={item._id} className="item">
                        Item: {item.name}, Quantity: {item.quantity}, ID:{" "}
                        {item._id}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="terminal-loading">→ Waiting for data...</div>
                )}
              </>
            )}

            <div className="terminal-ready">
              <span>Ready to deploy</span>
              <span className="cursor">_</span>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn btn-secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <Boxes className="btn-icon" />
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
