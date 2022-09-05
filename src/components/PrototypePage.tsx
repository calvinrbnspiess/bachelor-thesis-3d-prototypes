import Head from "next/head";
import classnames from "classnames";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { reportWebVitals } from "../pages/_app";
import Link from "next/link";

type PrototypePageProps = {
  id: string;
  className?: string;
  heroMediaSlot?: ReactNode;
  configuratorSlot?: ReactNode;
  annotationsSlot?: ReactNode;
};

const MEASURE_MARK_START = "prototype_start";
const MEASURE_TIMESPAN_NAME = "prototype_timespan";

const PrototypePage = (props: PrototypePageProps) => {
  const openSurvey = useCallback(() => {
    performance.measure(MEASURE_TIMESPAN_NAME, MEASURE_MARK_START);

    let url = new URL(
      "https://campus.lamapoll.de/Formative-Evaluation-der-Prototypen---Bachelor-Thesis-Immersives-Web-1"
    );

    let attribute = Buffer.from(
      JSON.stringify({
        prototype: props.id,
        metrics: window.__METRICS__,
        device: {
          width: window.screen.width,
          height: window.screen.height,
          pixelRatio: window.devicePixelRatio,
        },
        usage: {
          timeOrigin: performance.timeOrigin,
          start: performance.getEntriesByName(MEASURE_MARK_START)[0].startTime,
          duration: performance.getEntriesByName(MEASURE_TIMESPAN_NAME)[0]
            .duration,
        },
      }),
      "utf8"
    ).toString("base64");

    performance.clearMarks(MEASURE_MARK_START);
    performance.clearMeasures(MEASURE_TIMESPAN_NAME);

    url.searchParams.append(attribute, "true");

    window.location.href = url.toString();
  }, []);

  useEffect(() => {
    performance.mark(MEASURE_MARK_START);
  }, []);

  return (
    <>
      <Head>
        <title>Kawasaki Z900</title>
        <meta name="description" content={props.id} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main className={props.className}>
        <nav className={classnames("navigation", "navigation__container")}>
          <Link href={"/"}>
            <a
              className={classnames("navigation__logo")}
              data-prototype-id={props.id}
            />
          </Link>
        </nav>
        <section className={classnames("hero", "hero__container")}>
          <h1 className={classnames("hero__headline")}>
            Kawasaki
            <strong>Z900</strong>
            <span className={classnames("hero__headline-shade")}>2017</span>
          </h1>
          <div className={classnames("hero__media")}>{props.heroMediaSlot}</div>
          <p className={classnames("hero__content")}>
            Die neue Z900 besitzt einen 948-cm3-Reihenvierzylindermotor in einem
            völlig neuen, ultraleichten Rahmen und wurde für maximalen Fahrspaß
            konstruiert. Jede Bewegung am Gasgriff wird mit einer knackigen und
            zugleich ausgewogenen Gasannahme sowie einer aufregenden
            Beschleunigung honoriert.
            <button
              className={classnames(
                "button",
                "icon",
                "icon--right",
                "icon--shopping-cart"
              )}
            >
              Jetzt Bestellen
            </button>
          </p>
        </section>
        <section
          className={classnames("section", "section--solid", "section--kpi")}
        >
          <div className={classnames("section__container")}>
            <div className={classnames("grid", "grid--50-50")}>
              <div className={classnames("grid__column")}>
                <h2 className={classnames("section__headline")}>
                  Starke Leistungsdaten
                </h2>
                <p>
                  Die neue Z900 besitzt einen 948-cm3-Reihenvierzylindermotor in
                  einem völlig neuen, ultraleichten Rahmen und wurde für
                  maximalen Fahrspaß konstruiert.
                </p>
              </div>
              <div className={classnames("grid__column")}>
                <div className={classnames("kpi", "kpi__container")}>
                  <div className={classnames("kpi__content")}>
                    <div className={classnames("kpi__item")}>
                      Leistung
                      <strong>125,4 PS</strong>
                      92 KW
                    </div>
                    <div className={classnames("kpi__item")}>
                      Gewicht
                      <strong>210kg</strong>
                      463 lbs
                    </div>
                    <div className={classnames("kpi__item")}>
                      Reifen
                      <strong>{'17"'}</strong>
                      Aluminium
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className={classnames(
            "section",
            "section__container",
            "section--stretched",
            "section--configurator"
          )}
        >
          {props.configuratorSlot}
        </section>
        <section
          className={classnames(
            "section",
            "section__container",
            "section--stretched",
            "section--annotation"
          )}
        >
          <h2 className={classnames("section__headline")}>
            Kleine Details sind alles
          </h2>
          <p>
            Die aktualisierte Z900 bleibt ihren Stärken treu und bietet neben
            technischen Innovationen die nächste Stufe des Sugomi-Stylings. Für
            2020 erhält sie darüber hinaus einen überarbeiteten steiferen Rahmen
            und neu abgestimmte Federelemente.
          </p>
        </section>
        {props.annotationsSlot}
        <footer className={classnames("footer", "footer__container")}>
          <div className={classnames("footer__copyright")}>
            2022 © LINGNER.COM
          </div>
          <a onClick={openSurvey}>Zur Umfrage</a>
        </footer>
      </main>
    </>
  );
};

export default PrototypePage;
