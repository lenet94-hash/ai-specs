import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  if (variant === "primary") {
    return (
      <button
        className={[
          "bg-brand hover:bg-brand-hover active:bg-[#2580b8]",
          "text-fg1 font-inter font-medium text-[14px] leading-[21px] tracking-[0.35px]",
          "px-[24px] py-[12px] whitespace-nowrap",
          "rounded-tr-[8px] rounded-br-[8px]",
          "transition-colors duration-150 cursor-pointer",
          "flex items-center justify-center",
          fullWidth ? "w-full rounded-[8px]" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }

  return null;
}
