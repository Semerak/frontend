import { LanguagePicker } from '../ui/language-picker';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute top-4 left-4 z-10 w-18">
        <LanguagePicker />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <img
          src="/beutechful-logo.png"
          alt="Beutechful Logo"
          className="w-1/3"
        />
      </div>
      {children}
    </div>
  );
}
