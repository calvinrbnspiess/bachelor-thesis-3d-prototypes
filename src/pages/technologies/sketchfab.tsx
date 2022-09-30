import type { NextPage } from "next";
import * as css from "../../../styles/06-prototypes/technologies.module.scss";
import Head from "next/head";
import classnames from "classnames";
import Link from "next/link";
import { getPrototypeStylesheet } from "../../helpers/styles";
import { PrototypePageProps } from "../../components/PrototypePage";
import { useCallback, useEffect, useRef } from "react";

export const ShortPrototypePage = (props: PrototypePageProps) => (
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
      <section className={classnames("hero")}>
        <div className={classnames("hero__container")}>
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
        </div>
      </section>
    </main>
  </>
);

declare global {
  var Sketchfab: any;
}
const Prototype: NextPage = () => {
  const viewerRef = useRef(null);
  const scriptRef = useRef<HTMLScriptElement>(null);

  const initSketchfabClient = useCallback(() => {
    console.log("init sketchfab client");
    var client = new Sketchfab(viewerRef.current);
    var uid = "51d1eceef4ba4b18b2e4771f89fdfc4f";

    client.init(uid, {
      success: function onSuccess(api: any) {
        api.load(() => {
          api.start();
        });
        api.addEventListener("viewerready", function () {
          api.getNodeMap(function (err: any, nodes: any) {
            if (!err) {
              window.console.log(nodes); // [ ... ]
            }

            console.log("translate now");

            setTimeout(() => {
              api.translate(2, [-0.75, 0, 0], {
                duration: 1.0,
                easing: "easeOutQuad",
              });
            }, 500);
          });
        });
      },
      autostart: 1,
      preload: 1,
      transparent: 1,
      ui_hint: 0,
      ui_theme: "dark",
    });
  }, [viewerRef]);

  useEffect(() => {
    if (!scriptRef.current || !viewerRef.current) {
      return;
    }

    if (Sketchfab) {
      initSketchfabClient();
    }

    scriptRef.current.addEventListener("load", () => {
      initSketchfabClient();
    });
  }, [scriptRef, viewerRef]);

  return (
    <ShortPrototypePage
      id={"PV"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={
        <>
          <script
            type="text/javascript"
            src="http://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
            ref={scriptRef}
          ></script>
          <iframe
            title="Rendering_Motorcycle_Anthracite_GLB"
            frameBorder="0"
            allowFullScreen
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            ref={viewerRef}
          ></iframe>
        </>
      }
    />
  );
};

export default Prototype;
