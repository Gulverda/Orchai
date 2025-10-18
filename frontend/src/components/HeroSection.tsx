import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollIndicator } from './ScrollIndicator';

interface BlogItem {
  _id: string;
  name: string;
  quantity: number;
}

export function HeroSection() {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<BlogItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setItems(data);
        setMessage("Connected successfully");
      } catch (err) {
        console.error("Data fetching error:", err);
        setError("Failed to connect to backend. Make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <section
      id="hero"
      className="relative py-20 flex flex-col items-center justify-center px-6 overflow-hidden scroll-mt-16 mb-4"
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
          <span className="text-sm font-medium gradient-text">AI-Powered Automation</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Orch AI</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Transform your monorepo into production-ready containers in seconds.
          <br />
          Backend status and database data displayed below in real-time.
        </p>

        {/* Terminal Box */}
        <div className="mt-12 glass rounded-lg overflow-hidden shadow-card border border-border max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <span className="text-sm text-muted-foreground ml-2">Orchestrator-AI</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="text-primary">$</span>
              <span className="text-foreground">orchestrator-ai analyze {API_URL}</span>
            </div>

            {loading && (
              <div className="text-muted-foreground animate-pulse-glow">
                → Connecting to backend...
              </div>
            )}

            {error && (
              <div className="text-destructive">✗ {error}</div>
            )}

            {message && !error && (
              <>
                <div className="text-success">✓ Backend: {message}</div>
                <div className="text-muted-foreground animate-pulse-glow">
                  → Fetching database items...
                </div>
              </>
            )}

            {items.length > 0 ? (
              <>
                <div className="text-success">
                  ✓ Received {items.length} items from database
                </div>
                <div className="space-y-1 pl-4 border-l-2 border-primary/30">
                  {items.map((item) => (
                    <div key={item._id} className="text-foreground/80">
                      <span className="text-info">Item:</span> {item.name},{' '}
                      <span className="text-accent">Quantity:</span> {item.quantity},{' '}
                      <span className="text-muted-foreground">ID:</span> {item._id}
                    </div>
                  ))}
                </div>
              </>
            ) : !loading && !error && (
              <div className="text-muted-foreground animate-pulse-glow">
                → Waiting for data...
              </div>
            )}

            {!error && (
              <div className="flex items-center gap-2 text-primary pt-2">
                <span>Ready to deploy</span>
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
