import { ComponentProps } from "react";

type ExternalLinkProps = ComponentProps<"a">;

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
