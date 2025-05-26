import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { QuestinnairePages } from 'app/types/pages-enum';

import { SpotDisplay } from './components/spot-display';

interface SensorAnalysisProps {
  handleClick: (nextPage: QuestinnairePages) => void;
}

export function SensorAnalysis({ handleClick }: SensorAnalysisProps) {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-center justify-center">
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
            src="/sensor-user.png"
            alt="Face"
            className="w-60 h-72 object-cover"
          />
        </div>

        {/* Spots */}
        <div className="flex flex-col gap-6">
          <SpotDisplay number={1} color="background.paper" />
          <SpotDisplay number={2} color="background.paper" />
          <SpotDisplay number={3} color="background.paper" />
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
        handleClick={() => handleClick(QuestinnairePages.QuestionScreen)}
      />
    </main>
  );
}

export default SensorAnalysis;
