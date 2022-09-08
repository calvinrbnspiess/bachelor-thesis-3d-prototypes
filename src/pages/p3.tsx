import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p3.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { Annotations3DViewer, Configurator3DViewer } from "./p1";
import content from "../content";

let model = "Rendering_Motorcycle_Anthracite_GLB_REDUCED_DRACO.glb";

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P3"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<img src={content.renderImage} />}
      configuratorSlot={
        <Configurator3DViewer
          camera-controls
          data-js-focus-visible
          disableEnhancements
          src={model}
        />
      }
      annotationsSlot={
        <Annotations3DViewer
          camera-orbit="70deg 60deg 2.75m"
          camera-controls
          data-js-focus-visible
          disableEnhancements
          src={model}
        />
      }
    />
  );
};

export default Prototype;
