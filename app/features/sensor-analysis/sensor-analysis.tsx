import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';
import { QuestinnairePages } from 'app/types/pages-enum';
import { SmallLarge } from '~/components/layouts/small-large';
import { QuestionnaireTitle } from '~/components/ui/questionnaire-title';
import { ColorSensorProvider } from '~/context/color-sensor';
import { useMainFormContext } from '~/context/main-form-context';

import { SpotDisplay } from './components/spot-display';

interface SensorAnalysisProps {
  questionnaireIndex: number;
  handleClick: (nextPage: QuestinnairePages) => void;
}

export function SensorAnalysis({
  questionnaireIndex,
  handleClick,
}: SensorAnalysisProps) {
  const { t } = useTranslation();
  const { methods } = useMainFormContext();

  // Check if all 3 spots are scanned
  const formData = methods.watch();
  const spotValues = formData.answers?.[questionnaireIndex]?.value || [];
  const allSpotsScanned =
    spotValues.length >= 3 && spotValues[0] && spotValues[1] && spotValues[2];

  return (
    <main className="flex flex-col items-center justify-center">
      <ColorSensorProvider>
        {/* Title */}
        <QuestionnaireTitle
          title={t('sensorAnalysis.title')}
          subtitle={t('sensorAnalysis.instruction')}
        />

        <div className="flex flex-row items-center justify-evenly h-full mb-12">
          {/* Image */}
          <div className="rounded-3xl w-3/5 overflow-hidden justify-center flex h-full">
            <img
              src="/sensor-user.gif"
              alt="Face"
              className="w-9/10 rounded-3xl object-cover shadow-lg h-full"
            />
          </div>

          {/* Spots */}
          <div className="flex flex-col align-center justify-between h-full gap-8">
            <SpotDisplay
              questionnaireIndex={questionnaireIndex}
              number={1}
              text={t('sensorAnalysis.spot1')}
              color="background.paper"
              focus={spotValues.length === 0}
            />
            <SpotDisplay
              questionnaireIndex={questionnaireIndex}
              number={2}
              text={t('sensorAnalysis.spot2')}
              color="background.paper"
              disabled={spotValues.length < 1 && !spotValues[0]}
              focus={spotValues.length === 1}
            />
            <SpotDisplay
              questionnaireIndex={questionnaireIndex}
              number={3}
              text={t('sensorAnalysis.spot3')}
              color="background.paper"
              disabled={spotValues.length < 2 && !spotValues[1]}
              focus={spotValues.length === 2}
            />
          </div>
        </div>

        <DefaultButton
          text={t('common.nextPage')}
          handleClick={() => handleClick(QuestinnairePages.QuestionScreen)}
          disabled={!allSpotsScanned}
          focus={allSpotsScanned}
        />
      </ColorSensorProvider>
    </main>
  );
}

export default SensorAnalysis;
