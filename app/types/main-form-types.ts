export interface MainFormData {
  // Photo analysis is the characteristics of the analysed face
  // PLACEHOLDER FOR NOW: url
  photoAnalysis: {
    photoUrl?: string;
  };
  sensorAnalysis: {
    scanResult1: number[];
    scanResult2: number[];
    scanResult3: number[];
  };
  textQuestionAnswer: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  skinType: string;
}
