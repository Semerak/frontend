import { DefaultButton } from "~/components/DefaultButton";
import { SpotDisplay } from "~/sensor_analysis/components/SensorDisplay";
import { Page } from "~/routes/home";
import { useTranslation } from "react-i18next";

interface SensorAnalysisProps {
    handleClick: (nextPage: Page) => void;
}

export function SensorAnalysis({ handleClick }: SensorAnalysisProps) {
    const { t } = useTranslation();
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Progress Dots */}
            <div className="flex gap-2 mt-8 mb-6">
                <span className="w-5 h-5 rounded-full bg-[#8B6A4F]" />
                <span className="w-5 h-5 rounded-full bg-[#B08B5E]" />
                <span className="w-5 h-5 rounded-full bg-[#D2B48C]" />
                <span className="w-5 h-5 rounded-full bg-[#E5DED6]" />
                <span className="w-5 h-5 rounded-full bg-[#F3F1EF]" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-center mb-6">{t("sensorAnalysis.title")}</h1>

            <div className="flex flex-row items-center gap-12">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                        src="/face-placeholder.png"
                        alt="Face"
                        className="w-72 h-72 object-cover"
                    />
                </div>

                {/* Spots */}
                <div className="flex flex-col gap-6">
                    <SpotDisplay number={1} color="#C4C4C4" />
                    <SpotDisplay number={2} color="#C4C4C4" />
                    <SpotDisplay number={3} color="#C4C4C4" />
                </div>
            </div>

            {/* Instruction */}
            <div className="mt-8 text-center text-gray-400 text-base">
                {t("sensorAnalysis.instruction")}
            </div>

            <DefaultButton text={t("common.nextPage")} handleClick={() => handleClick(Page.Welcome)} />
        </main>
    );
};

export default SensorAnalysis;