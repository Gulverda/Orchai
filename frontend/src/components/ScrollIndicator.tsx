import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  const scrollToNext = () => {
    const element = document.getElementById('getting-started');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={scrollToNext}
      className="z-20 group cursor-pointer mt-16"
      aria-label="Scroll down"
    >
      <div className="flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Scroll down
        </span>
        <div className="flex flex-col gap-1">
          <ChevronDown className="h-6 w-6 text-primary animate-pulse-glow" />
          <ChevronDown className="h-6 w-6 text-primary -mt-4 opacity-50" />
        </div>
      </div>
    </button>
  );
}
