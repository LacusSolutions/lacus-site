import { MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function WhatsAppButton(): ReactNode {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '5541985187730';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  function handleClick(): void {
    window.open(whatsappUrl, '_blank');
  }

  function handleMouseEnter(): void {
    setIsExpanded(true);
  }

  function handleMouseLeave(): void {
    setIsExpanded(false);
  }

  function handleFocus(): void {
    setIsExpanded(true);
  }

  function handleBlur(): void {
    setIsExpanded(false);
  }

  return (
    <>
      {/* Mobile: Simple link button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Desktop: Expandable button with QR Code */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        {/* QR Code */}
        <div
          className={`absolute bottom-20 right-0 bg-white p-4 rounded-lg shadow-lg border transition-all duration-300 ${
            isExpanded
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
        >
          <QRCodeSVG
            value={whatsappUrl}
            size={120}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
            imageSettings={{
              src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDExLjVDMjAuNzM0OCAxNy4xMjYxIDE2LjEyNjEgMjEuNzM0OCAxMC41IDIySDMuNUMyLjY3MTU3IDIyIDIgMjEuMzI4NCAyIDIwLjVWMTMuNUMyLjI2NTIgNy44NzM5MyA2Ljg3MzkzIDMuMjY1MiAxMi41IDNDMTguMTI2MSAzLjI2NTIgMjIuNzM0OCA3Ljg3MzkzIDIzIDEzLjVIMjFaTTEyIDJDNi40NzcxNSAyIDIgNi40NzcxNSAyIDEyVjIxQzIgMjEuNTUyMyAyLjQ0NzcyIDIyIDMgMjJIMTJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJaTTguNTQyOTIgMTcuNUwxMS40Mjg2IDE0LjYxNDNDMTEuODE5NCAxNC4yMjM2IDEyLjQzMjEgMTQuMjE5NiAxMi44Mjg2IDE0LjYwNzFMMTUuNDI4NiAxNy4xNDI5TDE3LjU3MTQgMTMuNUw5IDEzLjVMOC41NDI5MiAxNy41WiIgZmlsbD0iIzI1RDM2NiIvPgo8L3N2Zz4K',
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
          <p className="text-xs text-gray-600 mt-2 text-center">Escaneie para conversar</p>
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`group flex items-center justify-center bg-secondary text-secondary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
            isExpanded ? 'pl-6 pr-4 py-3 gap-3' : 'w-14 h-14'
          }`}
          aria-label={isExpanded ? t('whatsapp.chat_text') : 'Chat on WhatsApp'}
        >
          <MessageCircle className="w-6 h-6 flex-shrink-0" />
          <span
            className={`whitespace-nowrap font-medium transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'
            }`}
          >
            {t('whatsapp.chat_text')}
          </span>
        </button>
      </div>
    </>
  );
}
