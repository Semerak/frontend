interface ResultLayoutProps {
  children: React.ReactNode;
}

export function ResultLayout({ children }: ResultLayoutProps) {
  return (
    <div className="flex flex-col  flex-grow w-full h-full mt-24">
      {children}
    </div>
  );
}
