import { LanguagePicker } from '../ui/language-picker';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      {/* Language picker fixed in top-left corner */}
      <div className="absolute top-4 left-4 z-20 w-18">
        <LanguagePicker />
      </div>

      {/* Main content area that takes all available space but doesn't overflow */}
      <div className="flex flex-col flex-grow min-h-0">
        {/* Content area that scrolls if needed */}
        <div className="flex-grow min-h-0 overflow-auto flex flex-col">
          {children}
        </div>

        {/* Footer that always stays at the bottom */}
        <footer className="flex-shrink-0 flex justify-center pt-4 pb-8 mt-auto">
          <img
            src="/beutechful-logo.png"
            alt="Beutechful Logo"
            className="w-1/3 sm:w-1/4 md:w-1/5 max-w-44"
          />
        </footer>
      </div>
    </div>
  );
}
