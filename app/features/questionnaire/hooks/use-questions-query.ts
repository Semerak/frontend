import { useQuery } from '@tanstack/react-query';

import { fetchQuestions } from '../questionnaire-api';

export function useQuestionsQuery() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
}
