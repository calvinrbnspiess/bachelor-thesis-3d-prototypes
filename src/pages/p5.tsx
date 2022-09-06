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
          camera-orbit="230deg 75deg 105%"
          onInitialization={(modelViewer) => {
            console.log("init p5 hero");

            let updateCameraOrbit = () => {
              let scrollPercentage =
                document.body.scrollTop / document.body.scrollHeight;

              console.log(scrollPercentage);

              let theta = Math.max(
                180,
                Math.min(230 + 360 * 0.5 * scrollPercentage, 270)
              );

              let phi = Math.max(
                60,
                Math.min(75 - 360 * 0.25 * scrollPercentage, 85)
              );

              let orbit = `${theta}deg ${phi}deg 105%`;

              console.log(orbit);

              modelViewer.cameraOrbit = orbit;
            };

            document.body.addEventListener("scroll", updateCameraOrbit);

            updateCameraOrbit();
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
