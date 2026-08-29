import logoSvg from "@/imports/logo.svg";

export default function Logo() {
  return (
    <div className="h-[49px] relative w-[146px]" data-name="Logo">
      <img
        alt="AISpecs"
        className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 w-[142px]"
        src={logoSvg}
      />
    </div>
  );
}
