// /packages/ui/src/components/inspector/types.ts

export type ElementNode = {
  tagName: string;
  id: string | null;
  classList: string[];
  children: ElementNode[];
};

export type StyleRule = {
  selector: string;
  cssText: string;
};

export type ExtractedData = {
  tree: ElementNode;
  rawStyles: StyleRule[];
};
