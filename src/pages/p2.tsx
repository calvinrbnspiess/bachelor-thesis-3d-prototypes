import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p2.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { Annotations3DViewer, Configurator3DViewer } from "./p1";
import content from "../content";

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P2"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<img src={content.renderImage} />}
      configuratorSlot={
        <Configurator3DViewer camera-controls data-js-focus-visible />
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
