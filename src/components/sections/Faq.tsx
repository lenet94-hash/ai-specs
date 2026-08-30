import svgPaths from "@/imports/SinglePageLandingPage/svg-xl4br07anw";
import FaqItem from "@/components/ui/FaqItem";

function InfoIcon() {
  return (
    <div className="overflow-clip relative size-[16px]">
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

const FAQ_ITEMS = [
  {
    question: "Як встановити плагін?",
    answer:
      "Завантаж архів плагіна. Відкрий Figma Desktop → Plugins → Development → Import plugin from manifest і вкажи файл manifest.json з архіву. Після цього плагін з'явиться у списку Plugins → Development → AI Specs. Публікація в Figma Community планується — слідкуй за оновленнями.",
  },
  {
    question: "Наскільки точні специфікації і що робити, якщо щось неточно?",
    answer:
      "Плагін зчитує параметри напряму з Figma-ноди — те, що є у файлі, те й відображається. Точність залежить від якості самого компонента: наскільки акуратно виставлені відступи, чи підключені токени. Якщо щось виявилось неточним — скопіюй специфікацію як Markdown і відредагуй вручну.",
  },
  {
    question: "Чи потребує це попереднього налаштування дизайн-системи?",
    answer:
      "Ні. AI Specs не потребує підключення токенів, Figma-бібліотеки чи жодної конфігурації заздалегідь. Достатньо одного компонента. Якщо в тебе є токени — плагін автоматично їх розпізнає і відобразить назву в колонці «Джерело».",
  },
  {
    question: "Чи підходить, якщо в мене немає формалізованої дизайн-системи?",
    answer:
      "Так. Навіть якщо в тебе немає офіційних токенів чи гайдлайнів, AI Specs може зафіксувати те, що вже є: фактичні значення відступів, кольори, розміри шрифтів. Це хороший спосіб почати документувати систему з нуля — покроково, без великих витрат часу.",
  },
  {
    question: "Скільки часу займає одна специфікація?",
    answer:
      "Специфікація з'являється миттєво після вибору елемента в Figma. Перегляд і копіювання займають кілька секунд. Порівняно з ручним написанням специфікації — це кількаразово швидше.",
  },
  {
    question: "Які формати входу підтримуються?",
    answer:
      "Наразі підтримується вибір Figma-ноди безпосередньо в плагіні — фрейми, компоненти, інстанси, текстові шари. У планах — підтримка Storybook-компонентів та HTML-фрагментів. Якщо тобі потрібен конкретний формат — напиши нам.",
  },
];

export default function Faq() {
  return (
    <section
      className="bg-bg1 border-t border-border1 w-full px-[80px] py-[64px]"
      data-name="Section"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col max-w-[1400px] w-full">
          {/* Section label */}
          <div className="flex gap-[12px] items-center">
            <InfoIcon />
            <p className="font-inter font-medium text-[11px] leading-[17px] tracking-[1.65px] uppercase text-brand whitespace-nowrap">
              FAQ
            </p>
          </div>

          {/* FAQ list */}
          <div className="flex flex-col items-center mt-[40px] w-full">
            <div className="flex flex-col max-w-[720px] w-full">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  noBorder={i === FAQ_ITEMS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
