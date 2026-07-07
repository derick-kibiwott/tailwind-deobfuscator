import { prettyPrintCSS } from "./utils";

type StyleCardProps = {
  selector: string;
  cssText: string;
  index: number;
};

export function StyleCard({ selector, cssText }: StyleCardProps) {
  return (
    <div className="bg-muted rounded-md border border-border overflow-hidden">
      <div className="bg-primary/5 px-3 py-1.5 border-b border-border text-xs font-mono text-primary font-medium">
        {selector}
      </div>
      <pre className="p-3 text-xs overflow-x-auto whitespace-pre-wrap break-all">
        {prettyPrintCSS(cssText)}
      </pre>
    </div>
  );
}
