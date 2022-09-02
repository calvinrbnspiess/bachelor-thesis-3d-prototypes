import type { NextPage } from "next";
import classnames from "classnames";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p1.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import content from "../content";
import { ModelViewer } from "../components/model-viewer/3DViewer";

export const Configurator3DViewer = ({ ...props }) => (
  <div
    className={classnames(
      "product-configurator",
      "product-configurator__container"
    )}
  >
    <ModelViewer
      src="Rendering_Motorcycle_DarkBlue_optimized_model-viewer.glb"
      {...props}
    ></ModelViewer>
  </div>
);

export const Annotations3DViewerHotspots = () => (
  <>
    {[
      {
        label: "lights",
        position:
          "-0.027275567189033817m 0.794247302348081m -0.6922994924549577m",
        normal:
          "-0.5228009382146555m -0.29874926472669744m -0.7983909166737393m",
      },
      {
        label: "tachometer",
        position:
          "0.015001775828903469m 1.0221719619477574m -0.40640584349104825m",
        normal: "-0.1407685048384038m 0.5846295499581701m 0.7989946916978035m",
      },
      {
        label: "capacity",
        position:
          "-0.20013945497934454m 0.39701987231941605m -0.12831288082582004m",
        normal:
          "-0.9995756847180706m -0.018024266811006082m 0.022881790277998755m",
      },
      {
        label: "indicators",
        position:
          "-0.2549633244571749m 0.7844301981983708m 0.7840681721568865m",
        normal: "-0.2673259401106931m 0.5167684597318217m -0.8133186342205218m",
      },
    ].map((hotspot) => (
      <button
        className={classnames("image-marker")}
        slot={`hotspot-${hotspot.label}`}
        data-position={hotspot.position}
        data-normal={hotspot.normal}
        key={hotspot.label}
      >
        <label className={"image-marker__label"}>
          {content.markers[hotspot.label]}
        </label>
        <span className={"image-marker__indicator"} />
      </button>
    ))}
  </>
);

export const Annotations3DViewer = ({ ...props }) => (
  <div
    className={classnames(
      "annotation-graphic",
      "annotation-graphic__container"
    )}
  >
    <ModelViewer
      src="Rendering_Motorcycle_DarkBlue_optimized_model-viewer.glb"
      {...props}
    >
      <Annotations3DViewerHotspots />
    </ModelViewer>
  </div>
);

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P1"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={
        <img src={"motorcycle-01-09-render4-1512-dark-blue.png"} />
      }
      configuratorSlot={
        <Configurator3DViewer
          exposure="0.15"
          data-js-focus-visible
          auto-rotate
        />
      }
      annotationsSlot={
        <Annotations3DViewer
          camera-orbit="70deg 60deg 2.75m"
          exposure="0.15"
          auto-rotate
          data-js-focus-visible
        />
      }
    />
  );
};

export default Prototype;
