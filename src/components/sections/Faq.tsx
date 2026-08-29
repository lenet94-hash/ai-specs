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
    question: "Наскільки точні специфікації і що робити, якщо AI помилився?",
    answer:
      "AI спирається на дані, які ти надав — Figma-ноду плюс бриф. Точність залежить від повноти даних у самому компоненті. Якщо щось виявилось неточним, ти завжди можеш відредагувати специфікацію вручну перед затвердженням. Жодного автоматичного публікування без твого рев'ю.",
  },
  {
    question: "Чи потребує це попереднього налаштування дизайн-системи?",
    answer:
      "Ні. AI Specs не потребує підключення токенів, Figma-бібліотеки чи жодної конфігурації заздалегідь. Достатньо одного компонента і короткого брифу. Якщо в тебе є токени — вкажи їх у брифі, і AI врахує їх у специфікації.",
  },
  {
    question: "Чи підходить, якщо в мене немає формалізованої дизайн-системи?",
    answer:
      "Так. Навіть якщо в тебе немає офіційних токенів чи гайдлайнів, AI Specs може зафіксувати те, що вже є: фактичні значення відступів, кольори, розміри шрифтів. Це хороший спосіб почати документувати систему з нуля — покроково, без великих витрат часу.",
  },
  {
    question: "Скільки часу займає одна специфікація?",
    answer:
      "Зазвичай від 1 до 3 хвилин — залежно від складності компонента і деталізації брифу. Рев'ю і затвердження займають стільки, скільки потрібно тобі. Порівняно з ручним написанням специфікації — це кількаразово швидше.",
  },
  {
    question: "Які формати входу підтримуються?",
    answer:
      "Наразі підтримуються Figma-ноди через посилання або плагін. У планах — підтримка Storybook-компонентів та HTML-фрагментів. Якщо тобі потрібен конкретний формат — напиши нам, і ми врахуємо це в пріоритетах.",
  },
  {
    question: "Що робити, якщо в мене зовсім немає часу писати детальний бриф?",
    answer:
      "Підключи Figma-ноду і напиши буквально одне речення — назву і контекст. AI зробить все інше й сформує базову специфікацію. Детальний бриф покращує якість результату, але не є обов'язковим. Потім можна доповнити специфікацію вручну в будь-який момент.",
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
