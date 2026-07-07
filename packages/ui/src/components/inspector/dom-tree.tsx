import type { ElementNode } from "@/types/inspector";

type DomTreeProps = {
  tree: ElementNode | null;
};

export function DomTree({ tree }: DomTreeProps) {
  if (!tree) {
    return <span className="text-muted-foreground">No element selected</span>;
  }

  return <TreeNode node={tree} depth={0} />;
}

function TreeNode({ node, depth }: { node: ElementNode; depth: number }) {
  const indent = depth * 12;
  const hasClasses = node.classList.length > 0;
  const hasId = node.id;

  return (
    <div>
      <div
        className="flex items-start gap-1 py-0.5"
        style={{ paddingLeft: `${indent}px` }}
      >
        <span className="text-blue-600 dark:text-blue-400 font-bold">
          {node.tagName}
        </span>

        {hasId && (
          <span className="text-amber-600 dark:text-amber-400 font-bold">
            #{node.id}
          </span>
        )}

        {hasClasses && (
          <span className="text-emerald-600 dark:text-emerald-400">
            {node.classList.map((c) => `.${c}`).join("")}
          </span>
        )}
      </div>

      {node.children.map((child, i) => (
        <TreeNode
          key={`${child.tagName}-${i}`}
          node={child}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
