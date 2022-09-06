import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p5.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { Annotations3DViewer, Configurator3DViewer } from "./p1";
import content from "../content";
import { ModelViewer } from "../components/model-viewer/3DViewer";

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P5"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={
        <ModelViewer
          src="Rendering_Motorcycle_Anthracite_GLB.glb"
          camera-orbit="-70deg 10deg 2.75m"
          onInitialization={(modelViewer) => {
            console.log("init p5 hero");
            document.body.addEventListener("scroll", () => {
              console.log(window.scrollY);
              modelViewer.cameraOrbit = `${Math.max(
                -70 + -0.15 * document.body.scrollTop,
                10
              )}deg ${0.15 * document.body.scrollTop}deg 2.75m`;
            });
          }}
        ></ModelViewer>
      }
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
