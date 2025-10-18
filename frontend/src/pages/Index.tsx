import { useState } from "react";
import Hero from "@/components/Hero";
import AnalysisForm from "@/components/AnalysisForm";
import AnalysisProgress from "@/components/AnalysisProgress";
import ResultsView from "@/components/ResultsView";
import Features from "@/components/Features";

type ViewState = "hero" | "form" | "analyzing" | "results";

interface Step {
  id: string;
  label: string;
  status: "pending" | "running" | "completed";
}

const Index = () => {
  const [view, setView] = useState<ViewState>("hero");
  const [steps, setSteps] = useState<Step[]>([
    { id: "clone", label: "Cloning repository...", status: "pending" },
    { id: "analyze", label: "Analyzing code structure...", status: "pending" },
    { id: "detect", label: "Detecting services and dependencies...", status: "pending" },
    { id: "ai", label: "Consulting AI for optimization...", status: "pending" },
    { id: "generate", label: "Generating Docker configurations...", status: "pending" },
  ]);

  const [results, setResults] = useState<{
    dockerfiles: { path: string; content: string }[];
    dockerCompose: string;
  }>({
    dockerfiles: [],
    dockerCompose: "",
  });

  const handleGetStarted = () => {
    setView("form");
  };

  const handleAnalyze = (url: string) => {
    setView("analyzing");
    simulateAnalysis(url);
  };

  const simulateAnalysis = async (url: string) => {
    // Simulate step-by-step analysis
    const stepOrder = ["clone", "analyze", "detect", "ai", "generate"];
    
    for (let i = 0; i < stepOrder.length; i++) {
      const currentStep = stepOrder[i];
      
      // Mark current step as running
      setSteps((prev) =>
        prev.map((step) =>
          step.id === currentStep
            ? { ...step, status: "running" }
            : step
        )
      );

      // Wait before completing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mark current step as completed
      setSteps((prev) =>
        prev.map((step) =>
          step.id === currentStep
            ? { ...step, status: "completed" }
            : step
        )
      );
    }

    // Generate mock results
    setResults({
      dockerfiles: [
        {
          path: "frontend/Dockerfile",
          content: `# Multi-stage build for React Frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
        },
        {
          path: "backend/Dockerfile",
          content: `# Multi-stage build for Node.js Backend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["node", "server.js"]`,
        },
      ],
      dockerCompose: `version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=postgres
      - DB_USER=\${DB_USER}
      - DB_PASSWORD=\${DB_PASSWORD}
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:`,
    });

    setView("results");
  };

  const handleReset = () => {
    setView("hero");
    setSteps((prev) =>
      prev.map((step) => ({ ...step, status: "pending" }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {view === "hero" && <Hero onGetStarted={handleGetStarted} />}
      
      {view === "form" && (
        <div className="min-h-screen flex flex-col items-center justify-center py-20">
          <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={false} />
        </div>
      )}

      {view === "analyzing" && (
        <div className="min-h-screen flex flex-col items-center justify-center py-20">
          <AnalysisProgress steps={steps} />
        </div>
      )}

      {view === "results" && (
        <>
          <ResultsView
            dockerfiles={results.dockerfiles}
            dockerCompose={results.dockerCompose}
            onReset={handleReset}
          />
          <Features />
        </>
      )}

      {view === "hero" && <Features />}
    </div>
  );
};

export default Index;
