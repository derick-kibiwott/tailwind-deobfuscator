import { StyleCard } from "./style-card";
import type { StyleRule } from "@/types/inspector";

type RawStylesProps = {
  styles: StyleRule[];
};

export function RawStyles({ styles }: RawStylesProps) {
  return (
    <div className="space-y-2">
      {styles.length > 0 ? (
        styles.map((rule, i) => (
          <StyleCard
            key={i}
            index={i}
            selector={rule.selector}
            cssText={rule.cssText}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No stylesheet rules matched the classes in this tree.
        </p>
      )}
    </div>
  );
}
