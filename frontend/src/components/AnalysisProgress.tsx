import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Step {
  id: string;
  label: string;
  status: "pending" | "running" | "completed";
}

interface AnalysisProgressProps {
  steps: Step[];
}

const AnalysisProgress = ({ steps }: AnalysisProgressProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Analysis in Progress</h2>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-primary/10 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                {step.status === "completed" && (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                )}
                {step.status === "running" && (
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                )}
                {step.status === "pending" && (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  step.status === "completed" ? "text-accent" :
                  step.status === "running" ? "text-primary" :
                  "text-muted-foreground"
                }`}>
                  {step.label}
                </p>
              </div>
              
              {step.status === "running" && (
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
