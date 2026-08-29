import svgPaths from "@/imports/SinglePageLandingPage/svg-xl4br07anw";

function SquareMenuIcon() {
  return (
    <div className="size-[16px] overflow-clip relative">
      <div className="absolute inset-[9.38%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
          <g>
            <path d={svgPaths.p175df700} fill="var(--color-brand)" />
            <path d={svgPaths.pae901f0} fill="var(--color-brand)" />
            <path d={svgPaths.p11745980} fill="var(--color-brand)" />
            <path d={svgPaths.p189f9680} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BookCheckIcon() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute inset-[5.21%_13.54%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="21.5" preserveAspectRatio="none" viewBox="0 0 17.5 21.5" width="17.5">
          <g>
            <path d={svgPaths.p19cb5200} fill="var(--color-brand)" />
            <path d={svgPaths.pa023b00} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FileCheckIcon() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute inset-[5.21%_13.54%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="21.5" preserveAspectRatio="none" viewBox="0 0 17.5 21.5" width="17.5">
          <g>
            <path d={svgPaths.p2875e500} fill="var(--color-brand)" />
            <path d={svgPaths.p1f6535f0} fill="var(--color-brand)" />
            <path d={svgPaths.p1e1b8a80} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FocusIcon() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute inset-[9.38%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="19.5" preserveAspectRatio="none" viewBox="0 0 19.5 19.5" width="19.5">
          <g>
            <path d={svgPaths.p2bc5a278} fill="var(--color-brand)" />
            <path d={svgPaths.p1228b80} fill="var(--color-brand)" />
            <path d={svgPaths.p1e471e00} fill="var(--color-brand)" />
            <path d={svgPaths.pe868500} fill="var(--color-brand)" />
            <path d={svgPaths.p1afc9570} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function UserCheckIcon() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute inset-[9.38%_5.21%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="19.4999" preserveAspectRatio="none" viewBox="0 0 21.4999 19.4999" width="21.4999">
          <g>
            <path d={svgPaths.p29910180} fill="var(--color-brand)" />
            <path d={svgPaths.p26801f80} fill="var(--color-brand)" />
            <path d={svgPaths.p37d200} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-bg2 border border-border1 rounded-[12px] p-[32px] flex flex-col">
      {icon}
      <p className="font-inter font-semibold text-[14px] leading-[25px] text-fg1 mt-[8px]">
        {title}
      </p>
      <p className="font-inter font-normal text-[14px] leading-[25px] text-fg2 mt-[8px]">
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section
      className="bg-bg1 border-t border-border1 w-full px-[80px] py-[64px]"
      data-name="Section"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col max-w-[1400px] w-full">
          {/* Section label */}
          <div className="flex gap-[12px] items-center">
            <SquareMenuIcon />
            <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
              Огляд функцій
            </p>
          </div>

          {/* 2x2 grid */}
          <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
            <FeatureCard
              icon={<BookCheckIcon />}
              title="Figma-нода → готова специфікація"
              description="Не потрібно вручну описувати кожен параметр компонента — AI аналізує дані напряму з Figma та формує структурований опис."
            />
            <FeatureCard
              icon={<FileCheckIcon />}
              title="Один формат для всієї команди"
              description="Специфікація виглядає однаково незалежно від того, хто і коли її створив — навіть якщо в команді немає окремої ролі, відповідальної за це."
            />
            <FeatureCard
              icon={<FocusIcon />}
              title="Точні значення замість «на око»"
              description="Замість того, щоб підбирати відступи чи кольори інтуїтивно, отримуй конкретні значення, зіставлені з вихідним компонентом."
            />
            <FeatureCard
              icon={<UserCheckIcon />}
              title="AI пропонує — ти затверджуєш"
              description="Кожна специфікація — це чернетка для рев'ю, а не фінальне рішення. Ти завжди можеш відредагувати перед використанням."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
