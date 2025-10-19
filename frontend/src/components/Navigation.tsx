import { useState } from 'react';
import { Menu, X, Box, Github, MessageCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow">
              <Box className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Orch AI</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('hero')}
              className="text-muted-foreground hover:text-foreground"
            >
              Documentation
            </Button>
            <a
              href="https://github.com/Gulverda/demo-monorepo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://discord.gg/orchestrator-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Discord
            </a>
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onNavigate('hero');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Documentation
              </Button>
              <a
                href="https://github.com/orchestrator-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://discord.gg/orchestrator-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Discord
              </a>
              <div className="px-4 py-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
