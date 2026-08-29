export default function FigmaConnectButton() {
  return (
    <div className="flex flex-col items-center gap-[12px]">
      <a href="/connect-figma">
        <button
          className={[
            "bg-brand hover:bg-brand-hover active:bg-[#2580b8]",
            "text-fg1 font-inter font-medium text-[14px] leading-[21px] tracking-[0.35px]",
            "px-[24px] py-[12px] whitespace-nowrap",
            "rounded-[8px]",
            "transition-colors duration-150 cursor-pointer",
            "flex items-center justify-center",
          ].join(" ")}
        >
          Підключити Figma
        </button>
      </a>
      <p className="font-inter font-normal text-[12px] leading-[18px] text-accent2">
        Підключення займає менше хвилини.
      </p>
    </div>
  );
}
