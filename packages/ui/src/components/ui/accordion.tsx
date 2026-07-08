import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const baseClassName =
    "absolute opacity-0 scale-0 text-muted-foreground bg-secondary rounded-sm box-content p-2 pointer-events-none size-4 shrink-0 transition-all duration-300";
  return (
    <AccordionPrimitive.Header className="group/accordion-header flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between rounded-lg border border-transparent p-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:text-muted-foreground border-b",
          className,
        )}
        {...props}
      >
        {children}
        <div className="relative size-8" data-slot="accordion-trigger-icon">
          <Plus
            aria-hidden="true"
            className={cn(
              baseClassName,
              "group-data-[closed]/accordion-header:opacity-100 group-data-[closed]/accordion-header:scale-100",
            )}
          />
          <Minus
            aria-hidden="true"
            className={cn(
              baseClassName,
              "group-data-[open]/accordion-header:opacity-100 group-data-[open]/accordion-header:scale-100",
            )}
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
