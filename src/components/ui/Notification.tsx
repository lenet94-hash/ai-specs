import { useEffect, useState } from "react";

interface NotificationProps {
  visible: boolean;
  onClose: () => void;
}

export default function Notification({ visible, onClose }: NotificationProps) {
  const [rendered, setRendered] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      const timer = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!rendered) return null;

  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50",
        "bg-bg3 border border-brand rounded-[8px]",
        "p-[16px] flex items-start gap-[12px]",
        "min-w-[280px] max-w-[360px]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        "transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      role="alert"
    >
      <div className="flex-shrink-0 mt-[1px]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="8.25" stroke="var(--color-brand)" strokeWidth="1.5" />
          <path
            d="M5.5 9.25L7.75 11.5L12.5 6.5"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="font-inter font-semibold text-[14px] leading-[21px] text-fg1">
          Вас додано до вейтлісту!
        </p>
        <p className="font-inter font-normal text-[12px] leading-[18px] text-accent1">
          Ми повідомимо, коли все буде готово.
        </p>
      </div>
      <button
        onClick={() => {
          setShow(false);
          setTimeout(onClose, 300);
        }}
        className="ml-auto flex-shrink-0 text-accent2 hover:text-fg1 transition-colors duration-150 cursor-pointer"
        aria-label="Закрити"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
