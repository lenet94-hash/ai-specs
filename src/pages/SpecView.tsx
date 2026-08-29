import type { SpecData, SpecProperty } from "@/lib/figma";
import Logo from "@/components/ui/Logo";

interface SpecViewProps {
  spec: SpecData;
  onBack: () => void;
}

function SourceCell({ prop }: { prop: SpecProperty }) {
  if (prop.source === "not-found") {
    return (
      <span className="font-inter font-normal text-[13px] leading-[21px] text-accent2 italic">
        не знайдено
      </span>
    );
  }
  if (prop.source === "token" && prop.token) {
    return (
      <span className="font-cousine text-[12px] leading-[21px] text-brand">
        {prop.token}
      </span>
    );
  }
  if (prop.source === "variable") {
    return (
      <span className="font-inter font-normal text-[13px] leading-[21px] text-accent2 italic">
        прив'язано до змінної (назва недоступна без Enterprise)
      </span>
    );
  }
  return (
    <span className="font-inter font-normal text-[13px] leading-[21px] text-accent2">
      пряме значення
    </span>
  );
}

function exportMarkdown(spec: SpecData): void {
  const rows = spec.properties.map((p) => {
    const src =
      p.source === "not-found"
        ? "не знайдено"
        : p.source === "token"
          ? `токен: ${p.token}`
          : p.source === "variable"
            ? "прив'язано до змінної (назва недоступна без Enterprise)"
            : "пряме значення";
    return `| ${p.name} | ${p.value} | ${src} |`;
  });

  const md = [
    `# ${spec.nodeName}`,
    `> Тип: ${spec.nodeType}`,
    "",
    "## Properties",
    "",
    "| Властивість | Значення | Джерело |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");

  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${spec.nodeName.replace(/\s+/g, "-").toLowerCase()}-spec.md`;
  a.click();
  URL.revokeObjectURL(blobUrl);
}

export default function SpecView({ spec, onBack }: SpecViewProps) {
  return (
    <div className="min-h-screen bg-bg1 flex flex-col items-center px-[24px] py-[64px]">
      <div className="flex flex-col items-center w-full max-w-[720px]">
        <Logo />

        {/* Top bar */}
        <div className="w-full mt-[40px] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="font-inter font-normal text-[14px] leading-[21px] text-accent2 hover:text-accent1 transition-colors duration-150 cursor-pointer"
          >
            ← Новий компонент
          </button>
          <button
            type="button"
            onClick={() => exportMarkdown(spec)}
            className="font-inter font-medium text-[13px] leading-[20px] tracking-[0.35px] text-brand hover:text-brand-hover transition-colors duration-150 cursor-pointer"
          >
            Експорт .md ↓
          </button>
        </div>

        {/* Heading */}
        <div className="w-full mt-[32px]">
          <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand">
            Специфікація
          </p>
          <h1 className="font-inter font-semibold text-[28px] leading-[34px] tracking-[-0.6px] text-fg1 mt-[8px]">
            {spec.nodeName}
          </h1>
          <p className="font-inter font-normal text-[13px] leading-[20px] text-accent2 mt-[4px]">
            {spec.nodeType}
          </p>
        </div>

        {/* Properties table */}
        <div className="w-full mt-[32px] border border-border1 rounded-[12px] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[2fr_2fr_2fr] bg-bg2 border-b border-border1 px-[20px] py-[10px]">
            {["Властивість", "Значення", "Джерело"].map((h) => (
              <span
                key={h}
                className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.1px] uppercase text-accent2"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {spec.properties.map((p, i) => (
            <div
              key={i}
              className={[
                "grid grid-cols-[2fr_2fr_2fr] px-[20px] py-[12px]",
                i < spec.properties.length - 1 ? "border-b border-border1" : "",
                p.source === "not-found" ? "opacity-40" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="font-inter font-normal text-[14px] leading-[21px] text-fg2">
                {p.name}
              </span>
              <span
                className={[
                  "text-[13px] leading-[21px]",
                  p.source === "not-found"
                    ? "font-inter italic text-accent2"
                    : "font-cousine text-fg1",
                ].join(" ")}
              >
                {p.value}
              </span>
              <SourceCell prop={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
