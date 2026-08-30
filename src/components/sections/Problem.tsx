import problemImg from "@/imports/SinglePageLandingPage/d9bd3f250e999c8123683075ae849b261ce18224.png";
import svgPaths from "@/imports/SinglePageLandingPage/svg-xl4br07anw";

function InfoIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]">
      <div className="absolute inset-[5.21%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="14.3333" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333" width="14.3333">
          <g>
            <path d={svgPaths.p13cf6000} fill="var(--color-brand)" />
            <path d={svgPaths.p28105680} fill="var(--color-brand)" />
            <path d={svgPaths.p38e0d200} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="size-[16px] overflow-clip relative shrink-0">
      <div className="absolute inset-[5.21%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="14.3333" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333" width="14.3333">
          <g>
            <path d={svgPaths.p13cf6000} fill="var(--color-brand)" />
            <path d={svgPaths.p2cbfb300} fill="var(--color-brand)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex gap-[12px] items-center w-full">
      <InfoIcon />
      <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}

/* Before/After visualization card */
function SpecCard({
  label,
  isAfter,
}: {
  label: string;
  isAfter: boolean;
}) {
  return (
    <div className="bg-[#131920] border border-brand rounded-[12px] p-[20px] w-[209.734px] flex flex-col">
      <div className="flex gap-[8px] items-center w-full">
        <div className="bg-brand rounded-full size-[6px] flex-shrink-0" />
        <p className="font-inter font-normal text-[11px] leading-[16.5px] tracking-[1.1px] uppercase text-brand whitespace-nowrap">
          {label}
        </p>
      </div>
      <div className="flex flex-col pt-[16px] h-[86px]">
        {isAfter ? (
          <>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap">
              <span className="absolute left-0 text-accent1">padding</span>
              <span className="absolute left-[66.58px] text-fg2">space/sm — 8px</span>
            </div>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap mt-[8px]">
              <span className="absolute left-0 text-accent1">color</span>
              <span className="absolute left-[59.36px] text-fg2">color/text-dark</span>
            </div>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap mt-[8px]">
              <span className="absolute left-0 text-accent1">font-size</span>
              <span className="absolute left-[81.03px] text-fg2">text/body-sm</span>
            </div>
          </>
        ) : (
          <>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap">
              <span className="absolute left-0 text-accent2">padding</span>
              <span className="absolute left-[124.38px] text-[#7a9eb5]">~12px?</span>
            </div>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap mt-[8px]">
              <span className="absolute left-0 text-accent2">color</span>
              <span className="absolute left-[117.16px] text-[#7a9eb5]">#2C3E50</span>
            </div>
            <div className="font-cousine text-[12px] leading-[18px] w-full relative h-[18px] whitespace-nowrap mt-[8px]">
              <span className="absolute left-0 text-accent2">font-size</span>
              <span className="absolute left-[131.61px] text-[#7a9eb5]">~14px</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex items-center justify-center py-[4px] w-[209.734px]">
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M8 1V16" stroke="var(--color-brand)" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M4 12L8 17L12 12" stroke="var(--color-brand)" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function Problem() {
  return (
    <section
      className="bg-bg2 border-t border-border1 w-full px-[80px] py-[64px]"
      data-name="Section"
    >
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-[1fr_1fr] gap-x-[80px] max-w-[1400px] w-full">
          {/* Left: text */}
          <div className="flex flex-col max-w-[640px]">
            <SectionLabel text="Проблема" />
            <p className="font-inter font-normal text-[14px] leading-[25px] text-fg2 mt-[20px] max-w-[640px]">
              Дизайн-система — це часто не посада, а обов'язок, який ти виконуєш поруч з основною роботою. Формального власника немає, тож специфікації компонентів пишеш сам — коли встигаєш, і щоразу трохи по-іншому.
            </p>
            <p className="font-inter font-normal text-[14px] leading-[25px] text-fg2 mt-[20px] max-w-[640px]">
              Розбіжності між дизайном і кодом здебільшого виявляються випадково — вже після того, як компонент потрапив у staging. А значення відступів, кольорів чи розмірів дизайнери часто підбирають «на око», а не звіряють з токенами — бо звірка забирає час, якого немає.
            </p>

            <div className="mt-[40px] border-t border-border1 w-full" />

            <div className="mt-[40px] border-l-2 border-brand pl-[20px] flex flex-col">
              <div className="flex gap-[12px] items-center w-full">
                <CheckIcon />
                <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
                  Рішення
                </p>
              </div>
              <p className="font-inter font-normal text-[14px] leading-[25px] text-fg2 mt-[20px] max-w-[618px]">
                AI Specs працює прямо у Figma — обери компонент, і плагін миттєво витягне всі параметри: відступи, кольори, типографіку, тіні — з посиланнями на токени, де вони є. Жодних форм, посилань і налаштувань наперед.
              </p>
            </div>
          </div>

          {/* Right: Before/After visual — image centered behind card */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <img
              alt=""
              aria-hidden
              className="absolute left-0 w-full h-auto top-1/2 -translate-y-[42%] pointer-events-none opacity-60 [clip-path:inset(8%_0_14%_0)]"
              src={problemImg}
            />
            <div className="relative z-10 flex flex-col items-start gap-[12px]">
              <SpecCard label="Без специфікації" isAfter={false} />
              <ArrowDown />
              <SpecCard label="AI Specs" isAfter={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
