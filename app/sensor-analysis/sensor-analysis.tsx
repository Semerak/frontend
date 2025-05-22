import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from '~/components/default-button';
import { SpotDisplay } from '~/sensor-analysis/components/spot-display';
import { Page } from '~/types/pages-enum';

interface SensorAnalysisProps {
  handleClick: (nextPage: Page) => void;
}

export function SensorAnalysis({ handleClick }: SensorAnalysisProps) {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Progress Dots */}
      <div className="flex gap-2 mt-8 mb-6">
        <span className="w-5 h-5 rounded-full bg-[#8B6A4F]" />
        <span className="w-5 h-5 rounded-full bg-[#B08B5E]" />
        <span className="w-5 h-5 rounded-full bg-[#D2B48C]" />
        <span className="w-5 h-5 rounded-full bg-[#E5DED6]" />
        <span className="w-5 h-5 rounded-full bg-[#F3F1EF]" />
      </div>

      {/* Title */}
      <div className="p-4">
        <Typography variant="h4" fontWeight={600} color="text.primary">
          {t('sensorAnalysis.title')}
        </Typography>
      </div>

      <div className="flex flex-row items-center gap-12">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src="/face-placeholder.png"
            alt="Face"
            className="w-72 h-72 object-cover"
          />
        </div>

        {/* Spots */}
        <div className="flex flex-col gap-6">
          <SpotDisplay number={1} color="#C4C4C4" />
          <SpotDisplay number={2} color="#C4C4C4" />
          <SpotDisplay number={3} color="#C4C4C4" />
        </div>
      </div>

      {/* Instruction */}
      <div className="mt-8 mb-2">
        <Typography variant="body1" fontWeight={400} color="gray">
          {t('sensorAnalysis.instruction')}
        </Typography>
      </div>

      <DefaultButton
        text={t('common.nextPage')}
        handleClick={() => handleClick(Page.Welcome)}
      />
    </main>
  );
}

export default SensorAnalysis;
