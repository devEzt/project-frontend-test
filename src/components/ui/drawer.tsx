"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=closed]:duration-300 data-[state=open]:slide-in-from-top data-[state=open]:duration-500",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=closed]:duration-300 data-[state=open]:slide-in-from-bottom data-[state=open]:duration-500",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=closed]:duration-300 data-[state=open]:slide-in-from-left data-[state=open]:duration-500 sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300 data-[state=open]:slide-in-from-right data-[state=open]:duration-500",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  (
    { className, children, side = "right", open, onOpenChange, ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(open || false);

    React.useEffect(() => {
      setIsOpen(open || false);
    }, [open]);

    const handleOpenChange = (newState: boolean) => {
      setIsOpen(newState);
      onOpenChange?.(newState);
    };

    // Determine a transformação baseada no lado
    const getTransformValue = () => {
      if (isOpen) return "translate(0, 0)";

      switch (side) {
        case "top":
          return "translate(0, -100%)";
        case "bottom":
          return "translate(0, 100%)";
        case "left":
          return "translate(-100%, 0)";
        case "right":
        default:
          return "translate(100%, 0)";
      }
    };

    return (
      <>
        {/* Overlay com transição suave e opacidade aumentada */}
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-75" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => handleOpenChange(false)}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
          }}
        />

        {/* Drawer com transição suave */}
        <div
          data-state={isOpen ? "open" : "closed"}
          className={cn(sheetVariants({ side }), className)}
          ref={ref}
          {...props}
          style={{
            transform: getTransformValue(),
            transition:
              "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            ...props.style,
          }}
        >
          {children}
        </div>
      </>
    );
  }
);
Sheet.displayName = "Sheet";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left mb-4", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-[28px] font-medium text-gray-900 font-serif",
      className
    )}
    {...props}
  />
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
SheetDescription.displayName = "SheetDescription";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-6 top-6 rounded-full p-2 bg-white text-gray-500 hover:text-gray-700 focus:outline-none shadow-sm transition-all hover:scale-105 duration-200",
      className
    )}
    {...props}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="currentColor"
      />
    </svg>
  </button>
));
SheetClose.displayName = "SheetClose";

export {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
};
