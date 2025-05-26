import CheckIcon from '@mui/icons-material/Check';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from '~/components/ui/default-button';

import { useGetSensorData } from '../hooks/use-get-sensor-data';

interface SpotDisplayProps {
  number: number;
  color: string;
  onClick?: () => void;
}

export function SpotDisplay({ number, color }: SpotDisplayProps) {
  const { t } = useTranslation();
  const { mutate, isPending, data } = useGetSensorData();

  const handleClick = () => {
    mutate();
  };

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
