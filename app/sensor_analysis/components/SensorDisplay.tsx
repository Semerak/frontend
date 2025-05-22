import React from "react";
import { useTranslation } from "react-i18next";

interface SpotDisplayProps {
    number: number;
    color: string;
    onClick?: () => void;
}

export const SpotDisplay: React.FC<SpotDisplayProps> = ({ number, color, onClick }) => {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            className="flex items-center gap-3 focus:outline-none group"
            onClick={onClick}
            tabIndex={0}
            aria-label={`Spot ${number}`}
        >
            <span className="font-bold text-lg text-black group-hover:underline">{number}. {t("sensorAnalysis.spot")}</span>
            <span
                className="w-9 h-9 rounded-full border border-gray-300 transition-shadow duration-200 group-hover:shadow-lg"
                style={{ backgroundColor: color }}
            />
        </button>
    )
};
