import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { Page } from 'app/types/pages-enum';

interface SensorAnalysisProps {
  handleClick: (nextPage: Page) => void;
}
export function Welcome({ handleClick }: SensorAnalysisProps) {
  const { t } = useTranslation();

  return (
    <main className="relative h-screen overflow-hidden">
      <div className="absolute scale-140 top-24">
        <img
          src="/welcome-picture.png"
          alt={t('startPage.welcome')}
          className="h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DefaultButton
          text={t('startPage.startAnalysis')}
          handleClick={() => handleClick(Page.SensorAnalysis)}
        />
      </div>
    </main>
  );
}
