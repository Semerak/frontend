import { FormLayout } from '~/components/layouts/form-layout';
import type { Page } from '~/types/pages-enum';

import Questionary from '../questionary/questionary';
import SensorAnalysis from '../sensor-analysis/sensor-analysis';

/**
 * LoadingScreen Component
 * This component serves as a full-screen loading screen, ideal for use as a HydrateFallback.
 */
interface FromScreenProps {
  handleClick: (nextPage: Page) => void;
}

export function FormScreen({ handleClick }: FromScreenProps) {
  return (
    <FormLayout steps={4} currentStep={2}>
      {/* <Questionary
        question="How often do you use foundation?"
        options={['A', 'B', 'C', 'D']}
        handleClick={handleClick}
      /> */}
      <SensorAnalysis handleClick={handleClick} />
    </FormLayout>
  );
}

export default FormScreen;
