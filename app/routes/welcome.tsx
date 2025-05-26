import { useTranslation } from 'react-i18next';

import { NavButton } from '~/components/ui/nav-button';

import type { Route } from './+types/welcome';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="absolute scale-140 top-24">
        <img
          src="/welcome-picture.png"
          alt={t('startPage.welcome')}
          className="h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <NavButton text={t('startPage.startAnalysis')} url="/questionnaire" />
      </div>
    </div>
  );
}
