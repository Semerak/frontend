import CheckIcon from '@mui/icons-material/Check';
import { CircularProgress } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from '~/components/ui/default-button';
import { useScanColor } from '~/context/color-sensor';
import { useMainFormContext } from '~/context/main-form-context';

// for on device color scanning application
// import { useGetSensorData } from '../hooks/use-get-sensor-data';

interface SpotDisplayProps {
  questionnaireIndex: number;
  number: number;
  color: string;
  onClick?: () => void;
}

export function SpotDisplay({
  questionnaireIndex,
  number,
  color,
}: SpotDisplayProps) {
  const { t } = useTranslation();
  const { methods } = useMainFormContext();
  // const { isConnected, error: connectionError } = useColorSensor();

  // New scan hook with trigger, data, and isPending
  const { trigger, data, isPending } = useScanColor();

  const handleClick = () => {
    trigger();
  };

  // Save scan result to form when data is available
  React.useEffect(() => {
    if (data && data.values) {
      methods.setValue(
        `answers[${questionnaireIndex}].value[${number - 1}]` as any,
        data.values,
      );
    }
  }, [data, number, methods]);

  return (
    <div className="flex flex-row items-center gap-4">
      <span
        className="w-9 h-9 rounded-full border border-gray-300 transition-shadow duration-200 group-hover:shadow-lg flex items-center justify-center"
        style={{ backgroundColor: !data ? color : data.hex_value }}
      >
        {isPending ? (
          <CircularProgress color="secondary" size="1.5rem" />
        ) : data?.hex_value ? (
          <CheckIcon htmlColor="background" />
        ) : null}
      </span>
      <DefaultButton
        text={`${t('sensorAnalysis.spot')} ${number}`}
        handleClick={handleClick}
      />
    </div>
  );
}
