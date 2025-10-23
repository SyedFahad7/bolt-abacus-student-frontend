import * as React from "react"
import { cn } from "../lib/utils"

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "ghost" | "secondary"
	size?: "sm" | "md" | "lg"
}

const sizes = {
	sm: "h-8 px-3 text-xs",
	md: "h-10 px-4 text-sm",
	lg: "h-12 px-6 text-base",
}

const variants = {
	default:
		"bg-[#facb25] text-[#000000] hover:bg-[#e6b422] border border-[#facb25]",
	secondary:
		"bg-[#161618] text-white hover:bg-[#2a2a2d] border border-[#212124]",
	outline:
		"bg-transparent text-white border border-[#2a2a2d] hover:bg-[#161618]",
	ghost:
		"bg-transparent text-white hover:bg-[#161618] border border-transparent",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "md", ...props }, ref) => (
		<button
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
				sizes[size],
				variants[variant],
				className
			)}
			{...props}
		/>
	)
)
Button.displayName = "Button"

export default Button