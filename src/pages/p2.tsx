import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p2.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { ModelViewer } from "../components/model-viewer/3DViewer";
import { Annotations3DViewer, Configurator3DViewer } from "./p1";

export const Hero3DViewer = ({ ...props }) => {
  return (
    <>
      <ModelViewer
        src="Rendering_Motorcycle_DarkBlue_optimized_model-viewer.glb"
        {...props}
      ></ModelViewer>
    </>
  );
};

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P2"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<Hero3DViewer data-js-focus-visible camera-controls />}
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
