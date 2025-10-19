import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  id: string;
}

export function CodeBlock({
  code,
  language = "javascript",
  id,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBash = language === "bash" || language === "shell";

  const highlightJS = (line: string) => {
    const keywords = [
      "import",
      "from",
      "const",
      "let",
      "var",
      "function",
      "async",
      "await",
      "return",
      "new",
      "class",
      "export",
      "default",
    ];
    const parts = line.split(/(\s+|[{}()[\];,.])/);

    return parts.map((part, i) => {
      if (keywords.includes(part)) {
        return (
          <span key={i} className="text-[hsl(var(--code-keyword))]">
            {part}
          </span>
        );
      }
      if (part.match(/^['"`].*['"`]$/)) {
        return (
          <span key={i} className="text-[hsl(var(--code-string))]">
            {part}
          </span>
        );
      }
      if (part.match(/^\d+$/)) {
        return (
          <span key={i} className="text-[hsl(var(--code-number))]">
            {part}
          </span>
        );
      }
      if (part.match(/^[A-Z][a-zA-Z]*$/)) {
        return (
          <span key={i} className="text-[hsl(var(--code-function))]">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative group rounded-lg overflow-hidden shadow-card">
      <div className="flex items-center justify-between px-4 py-2.5 bg-card">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {language}
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-7 w-7 hover:bg-primary/10 transition-all"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </Button>
      </div>

      <div className="bg-[hsl(var(--code-bg))]">
        <pre className="p-4 overflow-x-auto scrollbar-thin">
          <code
            className="text-sm font-mono leading-relaxed block"
            style={{ color: "hsl(var(--code-text))" }}
          >
            {code.split("\n").map((line, i) => (
              <div key={i} className="min-h-[1.5rem]">
                {isBash && line.trim().startsWith("#") ? (
                  <span className="text-[hsl(var(--code-comment))] italic">
                    {line}
                  </span>
                ) : isBash && line.trim().match(/^[\$>]/) ? (
                  <>
                    <span className="text-primary font-bold mr-2">$</span>
                    <span className="text-[hsl(var(--code-text))]">
                      {line.substring(line.indexOf("$") + 1).trim()}
                    </span>
                  </>
                ) : line.trim().startsWith("//") ||
                  line.trim().startsWith("/*") ? (
                  <span className="text-[hsl(var(--code-comment))] italic">
                    {line}
                  </span>
                ) : language === "javascript" ? (
                  <>{highlightJS(line)}</>
                ) : (
                  <span>{line || "\u00A0"}</span>
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
