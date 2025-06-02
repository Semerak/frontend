import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from 'app/components/ui/default-button';

interface CameraAnalysisProps {
  handleSubmit: () => void;
}

export function CameraAnalysis({ handleSubmit }: CameraAnalysisProps) {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center bg-white w-full h-full">
      <div className="p-4">
        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          align="center"
        >
          {/* PLACEHOLDER FOR TITLE */}
          Camera Analysis
        </Typography>
      </div>
      {/* PLACEHOLDER FOR CAMERA INTERACTION */}
      <DefaultButton
        text={t('common.nextPage')}
        handleClick={() => handleSubmit()}
      />
    </main>
  );
}

export default CameraAnalysis;
