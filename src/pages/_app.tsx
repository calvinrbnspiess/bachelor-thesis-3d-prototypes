import "../../styles/index.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";

type PrototypeMetric =
  | NextWebVitalsMetric
  | {
      name: string;
      startTime: number;
      label: string;
      value: number;
    };

declare global {
  interface Window {
    __METRICS__: PrototypeMetric[];
  }
}

export function reportWebVitals(metric: PrototypeMetric) {
  if (!window.__METRICS__) {
    window.__METRICS__ = [];
  }

  window.__METRICS__.push(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
