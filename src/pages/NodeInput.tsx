import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { parseFigmaUrl, fetchFigmaSpec, type SpecData } from "@/lib/figma";

interface NodeInputProps {
  token: string;
  onSpec: (spec: SpecData) => void;
  onReconnect: () => void;
}

export default function NodeInput({ token, onSpec, onReconnect }: NodeInputProps) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    const parsed = parseFigmaUrl(url);
    if (!parsed) {
      setUrlError(
        "Невалідне посилання. Очікується: https://www.figma.com/design/{key}/...?node-id={id}",
      );
      return;
    }
    setUrlError(null);
    setLoading(true);
    try {
      const spec = await fetchFigmaSpec(parsed.fileKey, parsed.nodeId, token);
      onSpec(spec);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Невідома помилка. Спробуй ще раз.",
      );
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = !loading && url.trim().length > 0;

  return (
    <div className="min-h-screen bg-bg1 flex flex-col items-center px-[24px] py-[64px]">
      <div className="flex flex-col items-center w-full max-w-[560px]">
        <Logo />

        <h1 className="font-inter font-semibold text-[32px] leading-[38px] tracking-[-0.8px] text-fg1 text-left mt-[40px] w-full">
          Вибери компонент
        </h1>
        <p className="font-inter font-normal text-[15px] leading-[26px] text-accent1 text-left mt-[12px] w-full">
          Вкажи посилання на ноду компонента у Figma. Перейди до компонента →
          правий клік → "Copy link to selection".
        </p>

        <form onSubmit={handleSubmit} noValidate className="w-full mt-[40px]">
          <label
            htmlFor="figma-url"
            className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand block mb-[8px]"
          >
            Figma URL
          </label>
          <input
            id="figma-url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (urlError) setUrlError(null);
              if (apiError) setApiError(null);
            }}
            placeholder="https://www.figma.com/design/..."
            className={[
              "w-full bg-bg2 rounded-[8px]",
              "font-inter font-normal text-[14px] leading-[21px] text-fg1",
              "px-[16px] py-[12px]",
              "placeholder:text-accent2",
              "focus:outline-none transition-colors duration-150",
              urlError
                ? "border border-error"
                : "border border-border2 focus:border-brand",
            ].join(" ")}
          />
          {urlError && (
            <p className="mt-[6px] font-inter text-[12px] leading-[18px] text-error">
              {urlError}
            </p>
          )}

          {apiError && (
            <div className="mt-[16px] bg-bg2 border border-error rounded-[8px] px-[16px] py-[12px]">
              <p className="font-inter font-normal text-[14px] leading-[22px] text-error">
                {apiError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              "mt-[16px] w-full rounded-[8px]",
              "font-inter font-medium text-[14px] leading-[21px] tracking-[0.35px]",
              "px-[24px] py-[12px]",
              "transition-colors duration-150",
              canSubmit
                ? "bg-brand hover:bg-brand-hover active:bg-[#2580b8] text-fg1 cursor-pointer"
                : "bg-border1 text-accent2 cursor-not-allowed",
            ].join(" ")}
          >
            {loading ? "Завантаження..." : "Згенерувати специфікацію"}
          </button>
        </form>

        <button
          type="button"
          onClick={onReconnect}
          className="mt-[32px] font-inter font-normal text-[13px] leading-[20px] text-accent2 hover:text-accent1 transition-colors duration-150 cursor-pointer"
        >
          ← Підключити інший токен
        </button>
      </div>
    </div>
  );
}
