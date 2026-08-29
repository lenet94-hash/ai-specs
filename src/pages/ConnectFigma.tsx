import { useState } from "react";
import Logo from "@/components/ui/Logo";

function EyeOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const STEPS = [
  "Відкрий Figma → натисни на іконку профілю у верхньому лівому куті → \"Settings\"",
  "Перейди на вкладку \"Security\"",
  "У розділі \"Personal access tokens\" натисни \"Generate new token\"",
  "Введи назву токена (наприклад: \"AI Specs\"), вибери термін дії (Expiration)",
  "У розділі \"Scopes\" постав чекбокс лише навпроти file_content:read — інші скоупи не потрібні",
  "Натисни \"Generate token\", скопіюй згенерований токен",
  "Встав токен у поле вище",
];

interface ConnectFigmaProps {
  onConnect?: (token: string) => void;
}

export default function ConnectFigma({ onConnect }: ConnectFigmaProps) {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  function handleContinue() {
    if (token.trim().length === 0) return;
    onConnect?.(token.trim());
  }

  const hasToken = token.trim().length > 0;

  return (
    <div className="min-h-screen bg-bg1 flex flex-col items-center px-[24px] py-[64px]">
      <div className="flex flex-col items-center w-full max-w-[560px]">

        {/* Logo */}
        <Logo />

        {/* Back link */}
        <div className="w-full mt-[40px]">
          <a
            href="/"
            className="font-inter font-normal text-[14px] leading-[21px] text-accent2 hover:text-accent1 transition-colors duration-150"
          >
            ← Повернутись
          </a>
        </div>

        {/* Heading */}
        <h1 className="font-inter font-semibold text-[32px] leading-[38px] tracking-[-0.8px] text-fg1 text-left mt-[32px] w-full">
          Підключи свій Figma-акаунт
        </h1>

        {/* Description */}
        <p className="font-inter font-normal text-[15px] leading-[26px] text-accent1 text-left mt-[12px] w-full">
          AI Specs використовує Personal Access Token, щоб отримати дані обраного тобою компонента напряму з Figma.
        </p>

        {/* Token input */}
        <div className="mt-[40px] w-full">
          <label
            htmlFor="pat-input"
            className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand block mb-[8px]"
          >
            Personal Access Token
          </label>
          <div className="relative flex items-center w-full">
            <input
              id="pat-input"
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="figd_••••••••••••••••••••••••••••"
              className={[
                "w-full bg-bg2 border border-border2 rounded-[8px]",
                "font-inter font-normal text-[14px] leading-[21px] text-fg1",
                "px-[16px] py-[12px] pr-[48px]",
                "placeholder:text-accent2",
                "focus:outline-none focus:border-brand",
                "transition-colors duration-150",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="absolute right-[14px] text-accent2 hover:text-accent1 transition-colors duration-150 cursor-pointer flex items-center"
              aria-label={showToken ? "Приховати токен" : "Показати токен"}
            >
              {showToken ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>
        </div>

        {/* Continue button */}
        <button
          type="button"
          disabled={!hasToken}
          onClick={handleContinue}
          className={[
            "mt-[16px] w-full rounded-[8px]",
            "font-inter font-medium text-[14px] leading-[21px] tracking-[0.35px]",
            "px-[24px] py-[12px]",
            "transition-colors duration-150",
            hasToken
              ? "bg-brand hover:bg-brand-hover active:bg-[#2580b8] text-fg1 cursor-pointer"
              : "bg-border1 text-accent2 cursor-not-allowed",
          ].join(" ")}
        >
          Продовжити
        </button>

        {/* Instructions */}
        <div className="mt-[32px] w-full border border-border1 rounded-[12px] p-[24px]">
          <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand mb-[16px]">
            Як отримати токен
          </p>
          <ol className="flex flex-col gap-[14px]">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-[12px] items-start">
                <span className="flex-shrink-0 size-[20px] rounded-full border border-brand flex items-center justify-center font-inter font-medium text-[11px] leading-none text-brand mt-[1px]">
                  {i + 1}
                </span>
                <span className="font-inter font-normal text-[14px] leading-[22px] text-fg2">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Trust note */}
        <p className="font-inter font-normal text-[12px] leading-[18px] text-accent2 text-left mt-[16px] w-full">
          Токен зберігається лише для доступу до обраних тобою файлів і ніде не публікується.
        </p>

      </div>
    </div>
  );
}
