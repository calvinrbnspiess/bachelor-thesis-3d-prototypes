import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p3.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { Annotations3DViewer, Configurator3DViewer } from "./p1";
import { Hero3DViewer } from "./p2";

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P3"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={
        <Hero3DViewer
          data-js-focus-visible
          camera-controls
          camera-target={"-1.25m auto auto"}
          min-camera-orbit={"-80deg 65deg auto"}
          max-camera-orbit={"20deg 90deg 2m"}
        />
      }
      configuratorSlot={
        <Configurator3DViewer data-js-focus-visible camera-controls />
      }
      annotationsSlot={
        <Annotations3DViewer
          camera-orbit="70deg 60deg 2.75m"
          camera-controls
          data-js-focus-visible
        />
      }
    />
  );
};

export default Prototype;
