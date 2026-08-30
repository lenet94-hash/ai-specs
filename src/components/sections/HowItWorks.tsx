import svgPaths from "@/imports/SinglePageLandingPage/svg-xl4br07anw";

function ChartLineIcon() {
  return (
    <div className="size-[16px] overflow-clip relative">
      <div className="absolute inset-[9.38%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
          <g>
            <path d={svgPaths.pfb3ff80} fill="var(--color-brand)" />
            <path d={svgPaths.p22a0d740} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StepCircle({ number }: { number: number }) {
  return (
    <div className="border border-brand rounded-full flex items-center justify-center size-[36px] flex-shrink-0">
      <span className="font-inter font-medium text-[14px] leading-[21px] tracking-[0.35px] text-brand">
        {number}
      </span>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, title, description, isLast = false }: StepProps) {
  return (
    <div className="flex flex-col max-[1020px]:flex-row max-[1020px]:gap-[20px]">

      {/* ≥1020px: circle + horizontal connector above text */}
      <div className="flex items-center pb-[32px] max-[1020px]:hidden">
        <StepCircle number={number} />
        {!isLast && <div className="bg-border1 h-px flex-1 ml-[12px]" />}
      </div>

      {/* <1020px: circle + vertical connector to the left of text */}
      <div className="hidden max-[1020px]:flex flex-col items-center flex-shrink-0">
        <StepCircle number={number} />
        {!isLast && <div className="bg-border1 w-px flex-1 mt-[8px]" />}
      </div>

      {/* Text — right of circle in vertical mode, below circle in horizontal mode */}
      <div className={["pr-[32px] max-[1020px]:pr-0", !isLast ? "max-[1020px]:pb-[32px]" : ""].filter(Boolean).join(" ")}>
        <p className="font-inter font-semibold text-[14px] leading-[25px] text-fg1">
          {title}
        </p>
        <p className="font-inter font-normal text-[14px] leading-[25px] text-accent1 mt-[12px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-bg2 border-t border-border1 w-full px-[80px] py-[64px]"
      data-name="Section"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col max-w-[1400px] w-full">
          {/* Section label */}
          <div className="flex gap-[12px] items-center">
            <ChartLineIcon />
            <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
              Як це працює
            </p>
          </div>

          {/* 4-column grid → single column at <1020px */}
          <div className="grid grid-cols-4 mt-[40px] max-[1020px]:grid-cols-1">
            <Step
              number={1}
              title="Крок 1. Встанови плагін"
              description="Відкрий Figma Desktop → Plugins → Development → Import plugin from manifest. Вкажи файл manifest.json з архіву плагіна. Установка займає менше хвилини."
            />
            <Step
              number={2}
              title="Крок 2. Обери компонент"
              description="Клікни на будь-який елемент у Figma — фрейм, компонент або інстанс. Плагін автоматично зчитає всі параметри обраної ноди."
            />
            <Step
              number={3}
              title="Крок 3. Переглянь специфікацію"
              description="Плагін формує структурований опис прямо в панелі: відступи, кольори, типографіку, тіні — з посиланнями на токени, де вони є."
            />
            <Step
              number={4}
              title="Крок 4. Скопіюй і використай"
              description="Скопіюй специфікацію як Markdown одним кліком і використай у документації, Notion або Confluence."
              isLast
            />
          </div>
        </div>
      </div>
    </section>
  );
}
