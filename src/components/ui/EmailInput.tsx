import type { InputHTMLAttributes } from "react";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
}

export default function EmailInput({
  error = false,
  errorMessage,
  fullWidth = false,
  className = "",
  ...props
}: EmailInputProps) {
  const borderColor = error
    ? "border-error"
    : "border-border2 hover:border-accent2 focus:border-brand";

  return (
    <div className={["flex flex-col", fullWidth ? "w-full" : "w-[268px]", className].join(" ")}>
      <div
        className={[
          "bg-bg3 rounded-tl-[8px] rounded-bl-[8px] border border-solid",
          borderColor,
          "transition-colors duration-150",
          fullWidth ? "rounded-[8px]" : "",
        ].join(" ")}
      >
        <input
          type="email"
          className={[
            "w-full bg-transparent px-[16px] py-[12px]",
            "font-inter font-normal text-[14px] leading-[25px]",
            "text-fg1 placeholder:text-accent2",
            "outline-none border-none",
          ].join(" ")}
          {...props}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-[6px] font-inter text-[12px] leading-[18px] text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
