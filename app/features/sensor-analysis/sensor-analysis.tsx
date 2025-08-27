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
        <QuestionnaireTitle title={t('sensorAnalysis.title')} />

        <div className="flex flex-row items-center justify-evenly h-full">
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
              color="background.paper"
            />
            <SpotDisplay
              questionnaireIndex={questionnaireIndex}
              number={2}
              color="background.paper"
            />
            <SpotDisplay
              questionnaireIndex={questionnaireIndex}
              number={3}
              color="background.paper"
            />
          </div>
        </div>

        {/* Instruction */}
        <div className=" m-4 mt-8 mb-2 text-center">
          <SmallLarge
            child_small={
              <Typography variant="body1" fontWeight={400} color="gray">
                {t('sensorAnalysis.instruction')}
              </Typography>
            }
            child_large={
              <Typography variant="h4" fontWeight={600} color="gray" m={8}>
                {t('sensorAnalysis.instruction')}
              </Typography>
            }
          />
        </div>

        <DefaultButton
          text={t('common.nextPage')}
          handleClick={() => handleClick(QuestinnairePages.QuestionScreen)}
          disabled={!allSpotsScanned}
        />
      </ColorSensorProvider>
    </main>
  );
}

export default SensorAnalysis;
