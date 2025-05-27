interface ResultLayoutProps {
  children: React.ReactNode;
}

export function ResultLayout({ children }: ResultLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex justify-center w-full mt-24"></div>
      <div className="flex flex-col  flex-grow w-full h-full">{children}</div>
    </div>
  );
}
