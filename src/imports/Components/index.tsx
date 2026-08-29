import svgPaths from "./svg-x6rhfb1wy4";

function Logo({ className }: { className?: string }) {
  return (
    <div className={className || "h-[49px] relative w-[146px]"} data-name="Logo">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[33px] left-[calc(50%+0.11px)] top-1/2 w-[142.227px]" data-name="AISpecs">
        <svg className="absolute block inset-0 size-full" fill="none" height="33" preserveAspectRatio="none" viewBox="0 0 142.227 33" width="142.227">
          <g id="AISpecs">
            <path d={svgPaths.p2cc90e00} fill="#4E6E84" />
            <path d={svgPaths.pf89ed00} fill="#4E6E84" />
            <path d={svgPaths.p81e10f0} fill="#3B9EDB" />
            <path d={svgPaths.p13dd4100} fill="#3B9EDB" />
            <path d={svgPaths.p2d989b00} fill="#3B9EDB" />
            <path d={svgPaths.p14352c00} fill="#3B9EDB" />
            <path d={svgPaths.p3e7a6e00} fill="#3B9EDB" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Button({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#3b9edb] relative rounded-br-[8px] rounded-tr-[8px]"} data-name="Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.35px] whitespace-nowrap">Додати у вейтлист</p>
        </div>
      </div>
    </div>
  );
}

function EmailInput({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#1c2130] relative rounded-bl-[8px] rounded-tl-[8px] w-[268px]"} data-name="Email Input">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[12px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#4e6e84] text-[14px] w-full">your@email.com</p>
        </div>
      </div>
      <div aria-hidden className="absolute border-[#2e3d52] border-b border-l border-solid border-t inset-0 pointer-events-none rounded-bl-[8px] rounded-tl-[8px]" />
    </div>
  );
}

function Tag({ className }: { className?: string }) {
  return (
    <div className={className || "relative rounded-[8px]"} data-name="Tag">
      <div aria-hidden className="absolute border border-[#3b9edb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Вже цього літа</p>
        </div>
      </div>
    </div>
  );
}

export default function Components() {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[2px] size-full" data-name="Components">
      <Tag className="absolute left-[99px] rounded-[8px] top-[180px]" />
      <EmailInput className="absolute bg-[#1c2130] left-[99px] rounded-bl-[8px] rounded-tl-[8px] top-[394px] w-[268px]" />
      <Button className="absolute bg-[#3b9edb] left-[99px] rounded-br-[8px] rounded-tr-[8px] top-[277px]" />
      <Logo className="absolute h-[49px] left-[99px] top-[99px] w-[146px]" />
    </div>
  );
}