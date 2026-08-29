import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  noBorder?: boolean;
}

export default function FaqItem({ question, answer, noBorder = false }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between py-[20px] w-full cursor-pointer text-left group"
        aria-expanded={open}
      >
        <span className="font-inter font-semibold text-[14px] leading-[25px] text-fg1 group-hover:text-brand transition-colors duration-150 pr-[16px]">
          {question}
        </span>
        <span
          className={[
            "flex-shrink-0 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={[
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <p className="font-inter font-normal text-[14px] leading-[25px] text-fg2 pb-[20px]">
          {answer}
        </p>
      </div>

      {!noBorder && <div className="bg-border1 h-px w-full flex-shrink-0" />}
    </div>
  );
}
