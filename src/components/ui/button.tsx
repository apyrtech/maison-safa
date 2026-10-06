import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "tap inline-flex items-center justify-center gap-2 text-xs font-medium tracking-label uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      tone: {
        ink: "min-h-11 bg-ink px-6 text-ivory hover:bg-ink/85",
        line: "min-h-11 border border-ink bg-transparent px-6 text-ink hover:bg-ink hover:text-ivory",
        quiet: "min-h-11 bg-transparent px-0 text-ink underline-offset-4 hover:underline",
      },
    },
    defaultVariants: { tone: "ink" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export function Button({ className, tone, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonStyles({ tone }), className)} {...props} />;
}

export function buttonClass(
  tone: VariantProps<typeof buttonStyles>["tone"] = "ink",
  className?: string,
) {
  return cn(buttonStyles({ tone }), className);
}
