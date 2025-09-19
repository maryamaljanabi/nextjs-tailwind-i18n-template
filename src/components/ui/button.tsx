import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary hover:bg-primary-foreground hover:text-primary",
        inverse:
          "bg-primary-foreground text-primary border border-primary hover:bg-primary hover:text-primary-foreground",
        outline:
          "border bg-background shadow-xs hover:bg-secondary hover:text-secondary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:border-secondary-foreground/20",
        ghost: "bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "rounded-md h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(buttonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" className={buttonClasses} {...props}>
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
