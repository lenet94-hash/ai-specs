import imgBg from "@/imports/Section/9bd59f952c26498f175a57739db133786ce3166e.png";
import imgCard1 from "@/imports/Section/0e5d359848a2cc8553892566ce594b75964e0620.png";
import imgCard2 from "@/imports/Section/fae6cf977b8ca55b2c09544087641c194a62a293.png";
import imgCard3 from "@/imports/Section/0d0bac7bdbcd54d4a7e3eb4805ad405021e83f8e.png";
import imgCard4 from "@/imports/Section/f9000eaef5a622c644d0dd375434d2e6006fd886.png";
import imgCard5 from "@/imports/Section/0e418e1b3eadc2e3694031319e2b5d52f1d84021.png";
import imgCard6 from "@/imports/Section/a7412d593ff62546cfcc8bd93eb80fa8ecda520c.png";
import imgCard7 from "@/imports/Section/232a41ffe5425bfd0084f66f92057f55addbcb81.png";
import FigmaConnectButton from "@/components/ui/FigmaConnectButton";
import Logo from "@/components/ui/Logo";

export default function Hero() {
  return (
    <section
      className="bg-[#0c131b] overflow-hidden w-full relative flex items-center justify-center p-[80px] min-h-[700px]"
      data-name="Section"
    >
      {/* Background image */}
      <div className="absolute inset-0 top-[-58px] pointer-events-none">
        <img alt="" className="absolute inset-0 size-full object-cover opacity-40" src={imgBg} />
      </div>

      {/* Decorative cards — left: calc(50% ± Xpx) where X = original distance from center of 1920px canvas */}
      {/* On wide screens positions match the design; on narrow screens cards exit the section and are clipped */}

      {/* Card 1 — top right (+344px from center), rotate -10.3° */}
      <div className="absolute flex h-[19.6vw] items-center justify-center left-[calc(50%+344px)] top-[-76px] w-[25.9vw] pointer-events-none">
        <div className="flex-none rotate-[-10.3deg] w-[91%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover" src={imgCard1} />
          </div>
        </div>
      </div>
      {/* Card 2 flat — top left (-1023px from center) */}
      <div className="absolute left-[calc(50%-1023px)] top-[-121px] w-[23.9vw] aspect-[3/2] pointer-events-none">
        <img alt="" className="absolute inset-0 size-full object-cover opacity-50" src={imgCard2} />
      </div>
      {/* Card 2 rotated — top left (-767px from center), rotate 22.2° */}
      <div className="absolute flex h-[24.3vw] items-center justify-center left-[calc(50%-767px)] top-[-121px] w-[28.8vw] pointer-events-none">
        <div className="flex-none rotate-[22.2deg] w-[85%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover" src={imgCard2} />
          </div>
        </div>
      </div>
      {/* Card 3 — right middle (+601px from center), rotate 22.32° */}
      <div className="absolute flex h-[21vw] items-center justify-center left-[calc(50%+601px)] top-[192px] w-[24.9vw] pointer-events-none">
        <div className="flex-none rotate-[22.32deg] w-[85%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover opacity-80" src={imgCard3} />
          </div>
        </div>
      </div>
      {/* Card 4 — left middle (-960px from center), rotate -9.21° */}
      <div className="absolute flex h-[16.2vw] items-center justify-center left-[calc(50%-960px)] top-[273px] w-[21.6vw] pointer-events-none">
        <div className="flex-none rotate-[-9.21deg] w-[91%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover opacity-50" src={imgCard4} />
          </div>
        </div>
      </div>
      {/* Card 5 — left bottom (-907px from center), rotate 10.28° */}
      <div className="absolute flex h-[23.9vw] items-center justify-center left-[calc(50%-907px)] top-[464px] w-[31.6vw] pointer-events-none">
        <div className="flex-none rotate-[10.28deg] w-[91%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover" src={imgCard5} />
          </div>
        </div>
      </div>
      {/* Card 6 — right bottom (+350px from center), rotate 6.42° */}
      <div className="absolute flex h-[21.9vw] items-center justify-center left-[calc(50%+350px)] top-[610px] w-[30.2vw] pointer-events-none">
        <div className="flex-none rotate-[6.42deg] w-[94%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover" src={imgCard6} />
          </div>
        </div>
      </div>
      {/* Card 7 — center bottom (-204px from center), rotate -13.23° */}
      <div className="absolute flex h-[21.1vw] items-center justify-center left-[calc(50%-204px)] top-[681px] w-[27vw] pointer-events-none">
        <div className="flex-none rotate-[-13.23deg] w-[89%]">
          <div className="relative w-full aspect-[3/2]">
            <img alt="" className="absolute inset-0 size-full object-cover opacity-50" src={imgCard7} />
          </div>
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col gap-[64px] items-center">
        {/* Logo */}
        <Logo />

        {/* Heading + text + form */}
        <div className="flex flex-col items-center">
          <h1 className="font-inter font-semibold text-[48px] leading-[50px] tracking-[-1.2px] text-[#f0f4f8] text-center max-w-[640px]">
            Специфікації компонентів за хвилини
          </h1>
          <p className="font-inter font-normal text-[17px] leading-[29px] text-[#8fb4ce] text-center mt-[24px] max-w-[520px]">
            Обери ноду компонента в Figma, додай короткий бриф — і отримай специфікацію в консистентному форматі.
          </p>
          <div className="mt-[40px] flex justify-center">
            <FigmaConnectButton />
          </div>
        </div>
      </div>
    </section>
  );
}
