"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 bg-white shadow-lg transition-all duration-300 ease-in-out max-w-full",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b p-6",
        bottom: "inset-x-0 bottom-0 border-t rounded-t-[10px] w-full",
        left: "inset-y-0 left-0 h-full border-r p-6",
        right: "inset-y-0 right-0 h-full border-l p-6",
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

    return (
      <>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out"
              onClick={() => handleOpenChange(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
              }}
            />
          </>
        )}
        <div
          className={cn(sheetVariants({ side }), className)}
          ref={ref}
          {...props}
          style={{
            transform: isOpen
              ? side === "bottom" || side === "top"
                ? "translateY(0)"
                : "translateX(0)"
              : side === "bottom"
              ? "translateY(100%)"
              : side === "top"
              ? "translateY(-100%)"
              : side === "right"
              ? "translateX(100%)"
              : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            height: side === "right" || side === "left" ? "100vh" : undefined,
            maxHeight: "100vh",
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
    className={cn("flex flex-col space-y-1 text-left mb-2", className)}
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
      "absolute right-6 top-6 rounded-full p-2 bg-white text-gray-500 hover:text-gray-700 focus:outline-none shadow-sm",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
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
