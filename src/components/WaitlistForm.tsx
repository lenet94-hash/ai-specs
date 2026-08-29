import { useState } from "react";
import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/EmailInput";

interface WaitlistFormProps {
  onSuccess: () => void;
  align?: "left" | "center";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function WaitlistForm({ onSuccess, align = "left" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        className={[
          "flex flex-col items-start",
          align === "center" ? "items-center" : "",
        ].join(" ")}
      >
        <div className="flex items-stretch max-w-[460px]">
          <EmailInput
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(false);
            }}
            error={error}
            aria-label="Email адреса"
          />
          <Button type="submit" disabled={submitted}>
            Додати у вейтлист
          </Button>
        </div>
        {error && (
          <p className="mt-[6px] font-inter text-[12px] leading-[18px] text-error">
            Будь ласка, введи коректний email
          </p>
        )}
        <p className="mt-[12px] font-inter font-normal text-[12px] leading-[18px] text-accent2">
          Жодного спаму — ми лише повідомимо, коли буде готово.
        </p>
      </div>
    </form>
  );
}
