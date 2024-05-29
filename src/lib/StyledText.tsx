import { ReactNode } from "react"

type StyledText = {
    children: ReactNode,
}

export function GradientText({ children }: StyledText) {
    return (
        <span className="bg-gradient-to-r from-secondary to-secondary-foreground bg-clip-text text-transparent">
            {children}
        </span>
    )
}

export function HighlightedText({ children }: StyledText) {
    return (
        <span className="bg-secondary/30">
            {children}
        </span>
    )
}