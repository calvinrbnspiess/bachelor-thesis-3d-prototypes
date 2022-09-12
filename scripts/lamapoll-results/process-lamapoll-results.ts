/**
 *
 * Script to process raw lamapoll (lamapoll.de) results. The prototypes are passing a custom attribute called vATTR1 to the poll service, which contains a base64 encoded json-structure with additional metrics and information.
 *
 * This script will process all data, adapt item negations and combine them together in a single excel (.xlsx) file. Additionally, for the datasets are common graphics generated.
 *
 * Usage: npm run poll:process -i <input-file>.csv -o <output-file>
 *
 * Input file (csv): vID, vDATE, V1.C1, V2.C1, V3.C1, V4.C1, V5.C1, V6.C1, V7.C1, V16.C1, V8.C2, V9.C2, V10.C2, V11.C2, V12.C2, V13.C2, V14.C2, V15.C2, vANONYM, vCOMPLETED, vFINISHED, vDURATION, vQUOTE, vATTR1, vLANG, vSTART, vEND, vDEVICE, vOS, vBROWSER, vRUNTIME, vPAGETIME1, vPAGETIME2, vPAGETIME3
 *
 */

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { format } from "date-fns";
import { readFile, writeFile } from "fs/promises";
import neatCsv from "neat-csv";
import stripBom from "strip-bom";
import xlsx from "xlsx";
import {
  CodedItem,
  DIMENSIONS,
  ITEM_CODING,
  ItemCoding,
} from "./parser/constants.js";
import * as dfd from "danfojs-node";

type CommandLineArgs = {
  inputFile: string;
  outputFile: string;
};

let prototypeDimensions = [];

const collectPlotData = async (prototype: string, codedItems: CodedItem[]) => {
  let education = codedItems.filter((item) =>
    item.dimension.includes(DIMENSIONS.EDUCATION)
  );
  let entertainment = codedItems.filter((item) =>
    item.dimension.includes(DIMENSIONS.ENTERTAINMENT)
  );
  let esthetic = codedItems.filter((item) =>
    item.dimension.includes(DIMENSIONS.ESTHETIC)
  );
  let escapism = codedItems.filter((item) =>
    item.dimension.includes(DIMENSIONS.ESCAPISM)
  );

  let educationAVG =
    education.reduce((a, b) => a + b.value, 0) / education.length;
  let entertainmentAVG =
    entertainment.reduce((a, b) => a + b.value, 0) / entertainment.length;
  let estheticAVG = esthetic.reduce((a, b) => a + b.value, 0) / esthetic.length;
  let escapismAVG = escapism.reduce((a, b) => a + b.value, 0) / escapism.length;

  prototypeDimensions.push([
    prototype,
    educationAVG,
    entertainmentAVG,
    estheticAVG,
    escapismAVG,
  ]);
};

const drawPlots = async () => {
  let dataframe = new dfd.DataFrame(prototypeDimensions, {
    columns: [
      "Prototype",
      "Education",
      "Entertainment",
      "Esthetic",
      "Escapism",
    ],
  });

  let mean = dataframe.groupby(["Prototype"]).mean();
  mean.setIndex({
    column: "Prototype",
    drop: true,
    inplace: true,
  });
  mean.sortIndex({ ascending: true, inplace: true });
  mean.print();
};

const processData = async (argv: CommandLineArgs) => {
  let inputFile = await readFile(argv.inputFile)
    .then((buffer) => buffer.toString())
    .then(stripBom);

  let worksheet: object[] = await neatCsv(inputFile, {
    separator: ";",
  });

  /**
   * Traverse rows with individual poll results
   */
  worksheet = worksheet.map((entry) => {
    let attr1: {
      prototype: string;
      device: { width: number; height: number; pixelRatio: number };
      metrics: [
        {
          id: string;
          name: string;
          startTime: number;
          value: number | string;
          label: string;
        }
      ];
      usage: { timeOrigin: number; start: number; duration: number };
    } = JSON.parse(Buffer.from(entry["vATTR1"], "base64").toString("utf-8"));

    let itemCodings: CodedItem[] = [];

    let items = Object.keys(ITEM_CODING).map((key) => {
      let coding = ITEM_CODING[key];
      let originalValue = parseInt(entry[key]);
      let scaledValue = originalValue;

      // make sure item is not an omitted one, which would distort the information
      if (
        originalValue !== -1 &&
        typeof coding.scalingFunction === "function"
      ) {
        scaledValue = coding.scalingFunction(originalValue);
      }

      itemCodings.push({
        shortName: coding.shortName,
        question: coding.question,
        dimension: coding.dimension,
        originalValue: originalValue,
        value: scaledValue,
      });

      return {
        [coding.shortName]: scaledValue,
      };
    });

    collectPlotData(attr1.prototype, itemCodings);

    let modelRenderTimes = attr1.metrics
      .filter((item) => item.label === "lin_prototype_model_load")
      .map((item) => {
        let name = (item.value as string).replace(".glb", "").toUpperCase();
        return {
          [`METRIK_${name}`]: item.startTime,
        };
      });

    return {
      ID: entry["vID"],
      PROTOTYP: attr1.prototype,
      DATUM: entry["vDATE"],
      ...items.reduce(
        (previousValue, currentValue) =>
          Object.assign(previousValue, currentValue),
        {}
      ),
      METRIK_GERÄT: entry["vDEVICE"],
      METRIK_BETRIEBSSYSTEM: entry["vOS"],
      METRIK_BROWSER: entry["vBROWSER"],
      METRIK_AUFLÖSUNG_BREITE: attr1.device.width,
      METRIK_AUFLÖSUNG_HÖHE: attr1.device.height,
      METRIK_AUFLÖSUNG_VERHÄLTNIS: attr1.device.pixelRatio,
      METRIK_ZEITURSPRUNG: attr1.usage.timeOrigin,
      METRIK_STARTZEITPUNKT: attr1.usage.start,
      METRIK_NUTZUNGSDAUER: attr1.usage.duration,
      METRIK_FIRST_INPUT_DELAY: attr1.metrics.find(
        (item) => item.name === "FCP"
      )?.value,
      METRIK_TIME_TO_FIRST_BYTE: attr1.metrics.find(
        (item) => item.name === "TTFB"
      )?.value,
      METRIK_CUMULATIVE_LAYOUT_SHIFT: attr1.metrics.find(
        (item) => item.name === "CLS"
      )?.value,
      METRIK_LARGEST_CONTENTFUL_PAINT: attr1.metrics.find(
        (item) => item.name === "LCP"
      )?.value,
      ...modelRenderTimes.reduce(
        (previousValue, currentValue) =>
          Object.assign(previousValue, currentValue),
        {}
      ),
    };
  });

  await drawPlots();

  let workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(
    workbook,
    xlsx.utils.json_to_sheet(worksheet),
    "auswertung"
  );
  let buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  await writeFile(argv.outputFile, buffer);
};

let argv = yargs(hideBin(process.argv))
  .option("input-file", {
    alias: "i",
    type: "string",
    demandOption: true,
    description: "specify input-file",
  })
  .option("output-file", {
    alias: "o",
    type: "string",
    demandOption: true,
    description: "specify input-file",
    default: `${format(new Date(), "yyyy-MM-dd")}-lamapoll-processed.xlsx`,
  }).argv;

processData(argv as CommandLineArgs);
