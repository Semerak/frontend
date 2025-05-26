import { LanguagePicker } from '../ui/language-picker';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Absolute Language Picker */}
      <div className="absolute top-4 left-4 z-10 w-18">
        <LanguagePicker />
      </div>

      {/* Page content with sticky footer layout */}
      <div className="flex flex-col flex-1">
        {/* Main content area grows to fill remaining space */}
        <div className="flex-1 overflow-auto flex flex-col justify-start">
          {children}
        </div>

        {/* Footer stuck to the bottom */}
        <footer className="flex justify-center pb-8  z-10">
          <img
            src="/beutechful-logo.png"
            alt="Beutechful Logo"
            className="w-1/3"
          />
        </footer>
      </div>
    </div>
  );
}
