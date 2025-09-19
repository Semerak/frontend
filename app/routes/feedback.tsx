import { FeedbackFormProvider } from '~/context/feedback-form-context';
import { FeedbackScreen } from '~/features/feedback/feedback-screen';

export default function Feedback() {
  return (
    <FeedbackFormProvider>
      <FeedbackScreen />
    </FeedbackFormProvider>
  );
}
