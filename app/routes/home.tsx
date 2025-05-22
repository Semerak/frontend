import SensorAnalysis from "~/sensor-analysis/sensor-analysis";
import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Makeup Match" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export enum Page {
  Welcome = "Welcome",
  SensorAnalysis = "SensorAnalysis",
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Welcome);

  function switchPage(nextPage: Page) {
    setCurrentPage(nextPage);
  }

  if (currentPage === Page.Welcome) {
    return <Welcome handleClick={switchPage} />;
  }

  if (currentPage === Page.SensorAnalysis) {
    return <SensorAnalysis handleClick={switchPage} />;
  }
}
