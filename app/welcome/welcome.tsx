import { DefaultButton } from "~/components/DefaultButton";
import { Page } from "~/routes/home";
interface SensorAnalysisProps {
  handleClick: (nextPage: Page) => void;
}
export function Welcome({ handleClick }: SensorAnalysisProps) {
  function testFunction() {
    console.log("123");
  }

  return (
    <main className="relative h-screen overflow-hidden">
      <div className="absolute scale-140 top-24">
        <img
          src="/welcome-picture.png"
          alt="Welcome image"
          className="h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DefaultButton text="Start Analysis" handleClick={() => handleClick(Page.SensorAnalysis)} />
      </div>
    </main>
  );
}
