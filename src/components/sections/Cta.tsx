import FigmaConnectButton from "@/components/ui/FigmaConnectButton";

export default function Cta() {
  return (
    <section
      className="bg-bg2 border-t border-border1 w-full px-[80px] py-[64px]"
      data-name="Section"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center max-w-[1400px] w-full">
          <h2 className="font-inter font-semibold text-[40px] leading-[44px] tracking-[-0.8px] text-fg1 text-center max-w-[640px] pb-[24px]">
            Спробуй AI Specs на своєму компоненті вже зараз
          </h2>

          <p className="font-inter font-normal text-[17px] leading-[29px] text-accent1 text-center max-w-[640px] pb-[40px]">
            Встанови плагін, обери компонент у Figma — і специфікація готова за секунди. Без попередніх налаштувань.
          </p>

          <FigmaConnectButton />
        </div>
      </div>
    </section>
  );
}
