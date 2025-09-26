import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import { DefaultButton } from '~/components/ui/default-button';
import { IconArrowLeft } from '~/components/ui/icons';

export const GrabTheSensor = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-w-3xl mx-auto text-center items-center pt-6 gap-28">
      <Typography variant="h2" fontWeight={600}>
        {t('scanningWarnings.title')}
      </Typography>
      <div className="flex flex-col gap-8 p-4 text-center items-center">
        <p className="text-[40px] font-normal">{t('grabTheSensor.text')}</p>
        <img
          width="312"
          src="/sensor.png"
          alt="Sensor"
          className="object-cover"
        />
        <div className="flex gap-4 px-12 py-8 rounded-xl bg-[#C49E9126] items-center w-full">
          <IconArrowLeft height={120} width={120} color="#C49E91" />
          <p className="text-[50px] font-semibold">
            {t('grabTheSensor.subtitle')}
          </p>
        </div>

        <p className="text-[32px] text-left mt-10 mb-20">
          {t('grabTheSensor.explanation')}
        </p>
        <DefaultButton
          size="medium"
          text={t('grabTheSensor.buttonText')}
          handleClick={() => undefined}
        />
      </div>
    </div>
  );
};

export default GrabTheSensor;
