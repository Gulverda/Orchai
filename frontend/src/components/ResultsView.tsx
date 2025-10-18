import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, CheckCircle, FileCode2, Layers } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResultsViewProps {
  dockerfiles: { path: string; content: string }[];
  dockerCompose: string;
  onReset: () => void;
}

const ResultsView = ({ dockerfiles, dockerCompose, onReset }: ResultsViewProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadAll = () => {
    // Create a simple text file with all content
    let allContent = "# Generated Dockerfiles and Docker Compose\n\n";
    
    dockerfiles.forEach(({ path, content }) => {
      allContent += `\n## ${path}\n\`\`\`dockerfile\n${content}\n\`\`\`\n`;
    });
    
    allContent += `\n## docker-compose.yml\n\`\`\`yaml\n${dockerCompose}\n\`\`\`\n`;
    
    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-config.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Files downloaded!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-secondary/50 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Analysis Complete</h2>
                <p className="text-sm text-muted-foreground">Your Docker configuration is ready</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
                onClick={handleDownloadAll}
              >
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
              <Button
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
                onClick={onReset}
              >
                Analyze Another
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="dockerfiles" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
              <TabsTrigger value="dockerfiles" className="data-[state=active]:bg-primary/20">
                <FileCode2 className="mr-2 h-4 w-4" />
                Dockerfiles
              </TabsTrigger>
              <TabsTrigger value="compose" className="data-[state=active]:bg-primary/20">
                <Layers className="mr-2 h-4 w-4" />
                Docker Compose
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dockerfiles" className="space-y-4 mt-4">
              {dockerfiles.map((dockerfile, index) => (
                <div key={index} className="rounded-lg border border-primary/20 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-primary/20">
                    <span className="text-sm font-mono text-primary">{dockerfile.path}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(dockerfile.content, index)}
                      className="hover:bg-primary/10"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 bg-background/50 overflow-x-auto">
                    <code className="text-sm text-foreground font-mono">{dockerfile.content}</code>
                  </pre>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="compose" className="mt-4">
              <div className="rounded-lg border border-primary/20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-primary/20">
                  <span className="text-sm font-mono text-primary">docker-compose.yml</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(dockerCompose, -1)}
                    className="hover:bg-primary/10"
                  >
                    {copiedIndex === -1 ? (
                      <CheckCircle className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <pre className="p-4 bg-background/50 overflow-x-auto">
                  <code className="text-sm text-foreground font-mono">{dockerCompose}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
