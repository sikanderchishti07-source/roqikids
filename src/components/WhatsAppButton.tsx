import { WHATSAPP_URL } from "../lib/data";
import { useI18n } from "../lib/i18n";

/** Floating WhatsApp quick-order button. */
export default function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="btn-base btn-sheen fixed bottom-24 start-5 z-40 grid size-12 place-items-center rounded-full bg-[#23a55b] text-white shadow-lift transition-colors hover:bg-[#1e8f4f] md:bottom-5"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-2.97.78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.37-1.72-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
      </svg>
    </a>
  );
}
