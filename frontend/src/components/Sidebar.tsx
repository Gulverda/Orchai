import { Book, Zap, Shield, Box, Code, Terminal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const sections = [
  { id: 'hero', label: 'Overview', icon: Sparkles },
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'how-it-works', label: 'How It Works', icon: Box },
  { id: 'api-reference', label: 'API Reference', icon: Code },
  { id: 'examples', label: 'Examples', icon: Terminal },
  { id: 'security', label: 'Security', icon: Shield },
];

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 glass border-r border-border overflow-y-auto">
      <div className="p-6 space-y-1">
        {sections.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeSection === id ? 'default' : 'ghost'}
            onClick={() => onNavigate(id)}
            className={`w-full justify-start gap-3 ${
              activeSection === id
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </aside>
  );
}
