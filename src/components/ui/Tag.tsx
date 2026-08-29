export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center border border-brand rounded-[8px] px-[12px] py-[6px]">
      <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
        {children}
      </p>
    </div>
  );
}
