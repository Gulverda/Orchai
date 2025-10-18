import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

interface AnalysisFormProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const AnalysisForm = ({ onAnalyze, isAnalyzing }: AnalysisFormProps) => {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast.error("Please enter a GitHub repository URL");
      return;
    }
    
    if (!repoUrl.includes("github.com")) {
      toast.error("Please enter a valid GitHub URL");
      return;
    }
    
    onAnalyze(repoUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Github className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Analyze Repository</h2>
            <p className="text-muted-foreground">
              Enter your GitHub repository URL to generate Dockerfiles and docker-compose configuration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={isAnalyzing}
                className="pl-12 h-12 bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start Analysis
                </>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-primary/20">
            <p className="text-sm text-muted-foreground text-center">
              Supports React, Node.js, and other popular frameworks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisForm;
