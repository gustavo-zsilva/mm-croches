import { ReactNode } from "react";

type StyledText = {
  children: ReactNode;
};

type GradientText = StyledText & {
  variant?: "default" | "instagram";
};

export function GradientText({ children, variant = "default" }: GradientText) {
  const gradientVariants = {
    default: "from-secondary to-secondary-foreground",
    instagram: "from-[#F9A330] to-[#FE4AA1]",
  };

  return (
    <span
      className={`bg-gradient-to-r ${gradientVariants[variant]} bg-clip-text text-transparent`}
    >
      {children}
    </span>
  );
}

export function HighlightedText({ children }: StyledText) {
  return <span className="bg-secondary/30">{children}</span>;
}
