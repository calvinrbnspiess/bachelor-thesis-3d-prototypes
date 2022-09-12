import { reverseLikertCoding } from "./helpers.js";

export enum DIMENSIONS {
  CONTROL_FACTORS,
  DISTRACTION_FACTORS,
  REALISM_FACTORS,
  SENSORY_FACTORS,
  EDUCATION,
  ENTERTAINMENT,
  ESTHETIC,
  ESCAPISM,
}

export type ItemCoding = {
  shortName: string;
  dimension: DIMENSIONS[];
  question: string;
  scalingFunction?: (number) => number;
};

export type CodedItem = {
  shortName: string;
  dimension: DIMENSIONS[];
  question: string;
  originalValue: number;
  value: number;
};

export const ITEM_CODING: { [key: string]: ItemCoding } = {
  "V1.C1": {
    shortName: "Beeinflussung",
    dimension: [DIMENSIONS.CONTROL_FACTORS],
    question: "Ich konnte die Umgebung beeinflussen.",
  },
  "V2.C1": {
    shortName: "Intuitivität",
    dimension: [DIMENSIONS.CONTROL_FACTORS],
    question: "Die Interaktion war intuitiv.",
  },
  "V3.C1": {
    shortName: "Ablenkung",
    dimension: [DIMENSIONS.DISTRACTION_FACTORS],
    scalingFunction: reverseLikertCoding,
    question: "Ich konnte die reale Umgebung ausblenden.",
  },
  "V4.C1": {
    shortName: "Konsistenz Sinneseindrücke",
    dimension: [DIMENSIONS.SENSORY_FACTORS, DIMENSIONS.REALISM_FACTORS],
    question: "Die verschiedenen Sinneseindrücke waren konsistent.",
  },
  "V5.C1": {
    shortName: "Konsistenz",
    dimension: [DIMENSIONS.SENSORY_FACTORS, DIMENSIONS.REALISM_FACTORS],
    question: "Die Erfahrung war ähnlich der realen Welt.",
  },
  "V6.C1": {
    shortName: "Vorausahnung",
    dimension: [DIMENSIONS.CONTROL_FACTORS],
    question: "Ich konnte die Bedienung vorausahnen.",
  },
  "V7.C1": {
    shortName: "Involvierung",
    dimension: [DIMENSIONS.SENSORY_FACTORS, DIMENSIONS.REALISM_FACTORS],
    question: "Ich war während des Experiments sehr involviert.",
  },
  "V16.C1": {
    shortName: "Reizüberflutung",
    dimension: [DIMENSIONS.SENSORY_FACTORS],
    scalingFunction: reverseLikertCoding,
    question: "Ich wurde mit unterschiedlichen Reizen überflutet.",
  },
  "V8.C2": {
    shortName: "Erkenntnis",
    dimension: [DIMENSIONS.EDUCATION],
    question: "Die Erfahrung war erkenntnisreich.",
  },
  "V9.C2": {
    shortName: "Neugier",
    dimension: [DIMENSIONS.EDUCATION],
    question: "Die Erfahrung hat meine Neugier geweckt neue Dinge zu lernen.",
  },
  "V10.C2": {
    shortName: "Spaß",
    dimension: [DIMENSIONS.ENTERTAINMENT],
    question: "Es hat Spaß gemacht die Webseite anzuschauen und zu bedienen.",
  },
  "V11.C2": {
    shortName: "Zweck",
    dimension: [],
    question: "Ich habe das Gefühl den Zweck der Webseite verstanden zu haben.",
  },
  "V12.C2": {
    shortName: "Harmonie",
    dimension: [DIMENSIONS.ESTHETIC],
    question: "Ich habe Harmonie gespürt.",
  },
  "V13.C2": {
    shortName: "Attraktivität",
    dimension: [DIMENSIONS.ESTHETIC],
    question: "Die Komposition war attraktiv.",
  },
  "V14.C2": {
    shortName: "Eintauchen",
    dimension: [DIMENSIONS.ESCAPISM],
    question:
      "Ich habe das Gefühl gehabt an einem anderen Ort oder in einer anderen Zeit zu sein.",
  },
  "V15.C2": {
    shortName: "Zeitgefühl",
    dimension: [DIMENSIONS.ESCAPISM],
    question:
      "Ich habe während des Experiments die Zeit aus den Augen gelassen.",
  },
};
