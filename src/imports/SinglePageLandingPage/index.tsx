import svgPaths from "./svg-xl4br07anw";
import imgChatGptImage1020262109591 from "./40e67a21063305053e1f335a004f8480c0be70c2.png";
import img4F68805380D54606855E35Cf7E93E47F1 from "./d9bd3f250e999c8123683075ae849b261ce18224.png";

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

function Frame() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <div className="h-[49px] relative shrink-0 w-[146px]" data-name="Logo">
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
      <div className="relative rounded-[8px] shrink-0" data-name="Tag">
        <div aria-hidden className="absolute border border-[#3b9edb] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Вже цього літа</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[50px] not-italic relative shrink-0 text-[#f0f4f8] text-[48px] tracking-[-1.2px] w-full">Специфікації компонентів за хвилини</p>
    </div>
  );
}

function ParagraphMargin() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pt-[24px] relative shrink-0" data-name="Paragraph:margin">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[29px] not-italic relative shrink-0 text-[#8fb4ce] text-[17px] w-[420px]">Завантаж скріншот або обери ноду в Figma, додай короткий бриф — і отримай специфікацію в консистентному форматі.</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex items-start max-w-[460px] pt-[40px] relative shrink-0" data-name="Form">
      <EmailInput className="bg-[#1c2130] relative rounded-bl-[8px] rounded-tl-[8px] self-stretch shrink-0 w-[268px]" />
      <div className="bg-[#3b9edb] relative rounded-br-[8px] rounded-tr-[8px] self-stretch shrink-0" data-name="Button">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] text-center tracking-[0.35px] whitespace-nowrap">Додати у вейтлист</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-[520px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#4e6e84] text-[12px] whitespace-nowrap">Жодного спаму — ми лише повідомимо, коли буде готово.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Frame />
      <div className="absolute h-[600px] left-[546px] top-[-74.05px] w-[1066px]" data-name="ChatGPT Image 10 серп. 2026 р., 21_09_59 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGptImage1020262109591} />
      </div>
      <Heading />
      <ParagraphMargin />
      <Form />
      <Paragraph />
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[56px] gap-y-[32px] grid-cols-[__684px_660.00px] grid-rows-[_480px] h-[480px] inline-grid max-w-[1400px] relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-center min-w-px relative" data-name="Container:align">
      <Container />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-[#0c131b] content-stretch flex items-center overflow-clip p-[80px] relative shrink-0 w-full" data-name="Section">
      <ContainerAlign />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Проблема</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / info">
        <div className="absolute inset-[5.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.3333" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333" width="14.3333">
            <g id="Vector">
              <path d={svgPaths.p13cf6000} fill="#3B9EDB" />
              <path d={svgPaths.p28105680} fill="#3B9EDB" />
              <path d={svgPaths.p38e0d200} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Text />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[640px]">Дизайн-система — це часто не посада, а обов’язок, який ти виконуєш поруч з основною роботою. Формального власника немає, тож специфікації компонентів пишеш сам — коли встигаєш, і щоразу трохи по-іншому.</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[640px]">Розбіжності між дизайном і кодом здебільшого виявляються випадково — вже після того, як компонент потрапив у staging. А значення відступів, кольорів чи розмірів дизайнери часто підбирають «на око», а не звіряють з токенами — бо звірка забирає час, якого немає.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container6() {
  return <div className="border-[#1a2333] border-solid border-t h-px relative shrink-0 w-full" data-name="Container" />;
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container6 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Рішення</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / circle-check">
        <div className="absolute inset-[5.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.3333" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333" width="14.3333">
            <g id="Vector">
              <path d={svgPaths.p13cf6000} fill="#3B9EDB" />
              <path d={svgPaths.p2cbfb300} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Text1 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[618px]">AI Specs перетворює скріншот або Figma-ноду компонента на структуровану специфікацію за лічені хвилини. AI пропонує варіант — ти переглядаєш, коригуєш і затверджуєш. Жодних припущень без твоєї перевірки.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="border-[#3b9edb] border-l-2 border-solid content-stretch flex flex-col items-start pl-[20px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Paragraph3 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch max-w-[640px] relative row-1 self-center shrink-0" data-name="Container">
      <Container4 />
      <ContainerMargin1 />
      <ContainerMargin2 />
    </div>
  );
}

function Container13() {
  return <div className="bg-[#3b9edb] relative rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.1px] uppercase whitespace-nowrap">Без специфікації</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Text2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#4e6e84] top-0">padding</p>
      <p className="absolute left-[124.38px] text-[#7a9eb5] top-0">~12px?</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#4e6e84] top-0">color</p>
      <p className="absolute left-[117.16px] text-[#7a9eb5] top-0">#2C3E50</p>
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#4e6e84] top-0">font-size</p>
      <p className="absolute left-[131.61px] text-[#7a9eb5] top-0">~14px</p>
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col h-[86px] items-start pt-[16px] relative shrink-0 w-[167.734px]" data-name="Container">
      <Container15 />
      <ContainerMargin3 />
      <ContainerMargin4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#131920] border border-[#3b9edb] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[12px] shrink-0 w-[209.734px]" data-name="Container">
      <Container12 />
      <Container14 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 16 20" width="16">
        <g id="Icon">
          <path d="M8 1V16" id="Vector" stroke="#3B9EDB" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M4 12L8 17L12 12" id="Vector_2" stroke="#3B9EDB" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-center py-[4px] relative shrink-0 w-[209.734px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container21() {
  return <div className="bg-[#3b9edb] relative rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.1px] uppercase whitespace-nowrap">AI Specs</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Text3 />
    </div>
  );
}

function Container23() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#8fb4ce] top-0">padding</p>
      <p className="absolute left-[66.58px] text-[#c8dce9] top-0">space/sm — 8px</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#8fb4ce] top-0">color</p>
      <p className="absolute left-[59.36px] text-[#c8dce9] top-0">color/text-dark</p>
    </div>
  );
}

function ContainerMargin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="[word-break:break-word] font-['Cousine:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative shrink-0 text-[12px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 text-[#8fb4ce] top-0">font-size</p>
      <p className="absolute left-[81.03px] text-[#c8dce9] top-0">text/body-sm</p>
    </div>
  );
}

function ContainerMargin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col h-[86px] items-start pt-[16px] relative shrink-0 w-[167.734px]" data-name="Container">
      <Container23 />
      <ContainerMargin5 />
      <ContainerMargin6 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#131920] border border-[#3b9edb] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[12px] shrink-0 w-[209.734px]" data-name="Container">
      <Container20 />
      <Container22 />
    </div>
  );
}

function BeforeAfterCard() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start max-w-[280px] relative shrink-0 w-[209.734px]" data-name="BeforeAfterCard">
      <Container11 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-full items-center justify-center relative shrink-0" data-name="Container">
      <BeforeAfterCard />
    </div>
  );
}

function Container9() {
  return (
    <div className="col-2 content-stretch flex h-[457px] items-center justify-center justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-x-[80px] gap-y-[80px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] max-w-[1400px] relative shrink-0 w-[1400px]" data-name="Container">
      <Container3 />
      <Container9 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container2 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-[#0f1015] border-[#1a2333] border-solid border-t content-stretch flex flex-col items-start px-[80px] py-[64px] relative shrink-0 w-full" data-name="Section">
      <div className="absolute h-[391px] left-[1014px] top-[117px] w-[632px]" data-name="4f688053-80d5-4606-855e-35cf7e93e47f 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[120.72%] left-[-0.01%] max-w-none top-[-9.72%] w-[100.02%]" src={img4F68805380D54606855E35Cf7E93E47F1} />
        </div>
      </div>
      <ContainerMargin />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Огляд функцій</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / square-menu">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
            <g id="Vector">
              <path d={svgPaths.p175df700} fill="#3B9EDB" />
              <path d={svgPaths.pae901f0} fill="#3B9EDB" />
              <path d={svgPaths.p11745980} fill="#3B9EDB" />
              <path d={svgPaths.p189f9680} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Text4 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-[624px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Скріншот або Figma-нода → готова специфікація</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[624px]">Не потрібно вручну описувати кожен параметр компонента — AI аналізує вихідні дані та формує структурований опис.</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#0f1015] border border-[#1a2333] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip p-[32px] relative rounded-[12px] row-1 self-start shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / book-check">
        <div className="absolute inset-[5.21%_13.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="21.5" preserveAspectRatio="none" viewBox="0 0 17.5 21.5" width="17.5">
            <g id="Vector">
              <path d={svgPaths.p19cb5200} fill="#3B9EDB" />
              <path d={svgPaths.pa023b00} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-[624px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Один формат для всієї команди</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[624px]">Специфікація виглядає однаково незалежно від того, хто і коли її створив — навіть якщо в команді немає окремої ролі, відповідальної за це.</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#0f1015] border border-[#1a2333] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[32px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / file-check">
        <div className="absolute inset-[5.21%_13.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="21.5" preserveAspectRatio="none" viewBox="0 0 17.5 21.5" width="17.5">
            <g id="Vector">
              <path d={svgPaths.p2875e500} fill="#3B9EDB" />
              <path d={svgPaths.p1f6535f0} fill="#3B9EDB" />
              <path d={svgPaths.p1e1b8a80} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-[624px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Точні значення замість «на око»</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[624px]">Замість того, щоб підбирати відступи чи кольори інтуїтивно, отримуй конкретні значення, зіставлені з вихідним компонентом.</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#0f1015] border border-[#1a2333] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[32px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / focus">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="19.5" preserveAspectRatio="none" viewBox="0 0 19.5 19.5" width="19.5">
            <g id="Vector">
              <path d={svgPaths.p2bc5a278} fill="#3B9EDB" />
              <path d={svgPaths.p1228b80} fill="#3B9EDB" />
              <path d={svgPaths.p1e471e00} fill="#3B9EDB" />
              <path d={svgPaths.pe868500} fill="#3B9EDB" />
              <path d={svgPaths.p1afc9570} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-[624px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">AI пропонує — ти затверджуєш</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#c8d8e4] text-[14px] w-[624px]">Кожна специфікація — це чернетка для рев’ю, а не фінальне рішення. Ти завжди можеш відредагувати перед використанням.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#0f1015] border border-[#1a2333] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[32px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / user-round-check">
        <div className="absolute inset-[9.38%_5.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="19.4999" preserveAspectRatio="none" viewBox="0 0 21.4999 19.4999" width="21.4999">
            <g id="Vector">
              <path d={svgPaths.p29910180} fill="#3B9EDB" />
              <path d={svgPaths.p26801f80} fill="#3B9EDB" />
              <path d={svgPaths.p37d200} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Container28() {
  return (
    <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[__690px_690px] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function ContainerMargin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container28 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1400px] relative shrink-0 w-[1400px]" data-name="Container">
      <Container27 />
      <ContainerMargin8 />
    </div>
  );
}

function ContainerMargin7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container26 />
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-[#0c131b] border-[#1a2333] border-solid border-t content-stretch flex flex-col items-start px-[80px] py-[64px] relative shrink-0 w-full" data-name="Section">
      <ContainerMargin7 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">Як це працює</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chart-line">
        <div className="absolute inset-[9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
            <g id="Vector">
              <path d={svgPaths.pfb3ff80} fill="#3B9EDB" />
              <path d={svgPaths.p22a0d740} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Text5 />
    </div>
  );
}

function Container39() {
  return (
    <div className="border border-[#3b9edb] border-solid content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#3b9edb] text-[14px] tracking-[0.35px] whitespace-nowrap">1</p>
    </div>
  );
}

function Container40() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-[302px]" data-name="Container" />;
}

function ContainerMargin12() {
  return (
    <div className="content-stretch flex flex-[314_0_0] items-start min-w-px pl-[12px] relative" data-name="Container:margin">
      <Container40 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <ContainerMargin12 />
    </div>
  );
}

function ContainerMargin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Container:margin">
      <Container38 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Крок 1. Підготуй контекст</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#8fb4ce] text-[14px] w-[318px]">{`Обери скріншот або Figma-ноду компонента. Додай короткий бриф: що це за компонент, де і навіщо він використовується, які стани. Якщо є пов'язані токени чи гайдлайни — вкажи їх окремо.`}</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[32px] relative shrink-0 w-full" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-[350_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <ContainerMargin11 />
      <Container41 />
    </div>
  );
}

function Container36() {
  return (
    <div className="col-1 content-stretch flex items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container37 />
    </div>
  );
}

function Container44() {
  return (
    <div className="border border-[#3b9edb] border-solid content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#3b9edb] text-[14px] tracking-[0.35px] whitespace-nowrap">2</p>
    </div>
  );
}

function Container45() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-[302px]" data-name="Container" />;
}

function ContainerMargin14() {
  return (
    <div className="content-stretch flex flex-[314_0_0] items-start min-w-px pl-[12px] relative" data-name="Container:margin">
      <Container45 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <ContainerMargin14 />
    </div>
  );
}

function ContainerMargin13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Container:margin">
      <Container43 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Крок 2. Завантаж</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#8fb4ce] text-[14px] w-[318px]">Завантаж скріншот або підключи Figma-ноду разом з брифом. Жодних складних форм — лише те, що реально потрібно для розуміння компонента.</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[32px] relative shrink-0 w-full" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Container42() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <ContainerMargin13 />
      <Container46 />
    </div>
  );
}

function Container49() {
  return (
    <div className="border border-[#3b9edb] border-solid content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#3b9edb] text-[14px] tracking-[0.35px] whitespace-nowrap">3</p>
    </div>
  );
}

function Container50() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-[302px]" data-name="Container" />;
}

function ContainerMargin16() {
  return (
    <div className="content-stretch flex flex-[314_0_0] items-start min-w-px pl-[12px] relative" data-name="Container:margin">
      <Container50 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <ContainerMargin16 />
    </div>
  );
}

function ContainerMargin15() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Container:margin">
      <Container48 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Крок 3. Отримай специфікацію</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#8fb4ce] text-[14px] w-[318px]">AI аналізує вихідні дані й формує структурований опис: параметри, значення, стани, поведінку — у консистентному форматі.</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[32px] relative shrink-0 w-full" data-name="Container">
      <Paragraph16 />
      <Paragraph17 />
    </div>
  );
}

function Container47() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <ContainerMargin15 />
      <Container51 />
    </div>
  );
}

function Container54() {
  return (
    <div className="border border-[#3b9edb] border-solid content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[36px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#3b9edb] text-[14px] tracking-[0.35px] whitespace-nowrap">4</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container54 />
    </div>
  );
}

function ContainerMargin17() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Container:margin">
      <Container53 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Крок 4. Перевір і затверди</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#8fb4ce] text-[14px] w-[350px]">Переглянь згенеровану специфікацію, скоригуй за потреби й затверди фінальну версію. Останнє слово — завжди за тобою.</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph18 />
      <Paragraph19 />
    </div>
  );
}

function Container52() {
  return (
    <div className="col-4 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <ContainerMargin17 />
      <Container55 />
    </div>
  );
}

function Container35() {
  return (
    <div className="grid grid-cols-[____350px_350px_350px_350px] grid-rows-[_230px] relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container42 />
      <Container47 />
      <Container52 />
    </div>
  );
}

function ContainerMargin10() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container35 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1400px] relative shrink-0 w-[1400px]" data-name="Container">
      <Container34 />
      <ContainerMargin10 />
    </div>
  );
}

function ContainerMargin9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container33 />
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[#0f1015] border-[#1a2333] border-solid border-t content-stretch flex flex-col items-start px-[80px] py-[64px] relative shrink-0 w-full" data-name="Section">
      <ContainerMargin9 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[17px] not-italic relative shrink-0 text-[#3b9edb] text-[11px] tracking-[1.65px] uppercase whitespace-nowrap">FAQ</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon / info">
        <div className="absolute inset-[5.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.3333" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333" width="14.3333">
            <g id="Vector">
              <path d={svgPaths.p13cf6000} fill="#3B9EDB" />
              <path d={svgPaths.p28105680} fill="#3B9EDB" />
              <path d={svgPaths.p38e0d200} fill="#3B9EDB" />
            </g>
          </svg>
        </div>
      </div>
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Наскільки точні специфікації і що робити, якщо AI помилився?</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-between py-[20px] relative shrink-0 w-full" data-name="Button">
      <Text7 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-full" data-name="Container" />;
}

function FaqItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="FaqItem">
      <Button />
      <Container59 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Чи потребує це попереднього налаштування дизайн-системи?</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-between py-[20px] relative shrink-0 w-full" data-name="Button">
      <Text8 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-full" data-name="Container" />;
}

function FaqItem1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="FaqItem">
      <Button1 />
      <Container60 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Чи підходить, якщо в мене немає формалізованої дизайн-системи?</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-between py-[20px] relative shrink-0 w-full" data-name="Button">
      <Text9 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-full" data-name="Container" />;
}

function FaqItem2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="FaqItem">
      <Button2 />
      <Container61 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Скільки часу займає одна специфікація?</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-between py-[20px] relative shrink-0 w-full" data-name="Button">
      <Text10 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-full" data-name="Container" />;
}

function FaqItem3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="FaqItem">
      <Button3 />
      <Container62 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Які формати входу підтримуються?</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-between py-[20px] relative shrink-0 w-full" data-name="Button">
      <Text11 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return <div className="bg-[#1a2333] h-px relative shrink-0 w-full" data-name="Container" />;
}

function FaqItem4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="FaqItem">
      <Button4 />
      <Container63 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[25px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] whitespace-nowrap">Що робити, якщо в мене зовсім немає часу писати детальний бриф?</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-start justify-between py-[20px] relative shrink-0 w-[720px]" data-name="Button">
      <Text12 />
      <div className="h-[16px] overflow-clip relative shrink-0 w-[24px]" data-name="Icon / chevron-down">
        <div className="absolute inset-[34.38%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="4.99992" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99992" width="8.99992">
            <path d={svgPaths.p2a326440} fill="#3B9EDB" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[720px] relative shrink-0 w-[720px]" data-name="Container">
      <FaqItem />
      <FaqItem1 />
      <FaqItem2 />
      <FaqItem3 />
      <FaqItem4 />
      <Button5 />
    </div>
  );
}

function ContainerMargin19() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container58 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1400px] relative shrink-0 w-[1400px]" data-name="Container">
      <Container57 />
      <ContainerMargin19 />
    </div>
  );
}

function ContainerMargin18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container56 />
    </div>
  );
}

function Section4() {
  return (
    <div className="bg-[#0c131b] border-[#1a2333] border-solid border-t content-stretch flex flex-col items-start px-[80px] py-[64px] relative shrink-0 w-full" data-name="Section">
      <ContainerMargin18 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[640px] pb-[24px] relative shrink-0 w-[640px]" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#f0f4f8] text-[40px] text-center tracking-[-0.8px] w-[640px]">Продукт ще у розробці — і твоя думка може вплинути на те, яким він стане</p>
    </div>
  );
}

function ParagraphMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[40px] relative shrink-0 w-full" data-name="Paragraph:margin">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[29px] not-italic relative shrink-0 text-[#8fb4ce] text-[17px] text-center w-[640px]">Ми збираємо перших користувачів, які тестуватимуть наш продукт на своїх реальних компонентах і допоможуть визначити, наскільки продукту можна довіряти без постійної ручної перевірки.</p>
    </div>
  );
}

function Form1() {
  return (
    <div className="content-stretch flex items-start max-w-[460px] pb-[12px] relative shrink-0" data-name="Form">
      <EmailInput className="bg-[#1c2130] relative rounded-bl-[8px] rounded-tl-[8px] self-stretch shrink-0 w-[268px]" />
      <div className="bg-[#3b9edb] relative rounded-br-[8px] rounded-tr-[8px] self-stretch shrink-0" data-name="Button">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#f0f4f8] text-[14px] text-center tracking-[0.35px] whitespace-nowrap">Додати у вейтлист</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[1400px] relative shrink-0 w-[1400px]" data-name="Container">
      <Heading1 />
      <ParagraphMargin1 />
      <Form1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#4e6e84] text-[12px] text-center whitespace-nowrap">Жодного спаму — ми лише повідомимо, коли буде готово.</p>
    </div>
  );
}

function ContainerMargin20() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container64 />
    </div>
  );
}

function Section5() {
  return (
    <div className="bg-[#0f1015] border-[#1a2333] border-solid border-t content-stretch flex flex-col items-start px-[80px] py-[64px] relative shrink-0 w-full" data-name="Section">
      <ContainerMargin20 />
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="App">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <App />
    </div>
  );
}

export default function SinglePageLandingPage() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Single-page landing page">
      <Body />
    </div>
  );
}