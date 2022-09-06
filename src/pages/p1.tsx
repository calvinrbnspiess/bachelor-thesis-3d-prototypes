import type { NextPage } from "next";
import classnames from "classnames";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p1.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import content from "../content";
import { ModelViewer } from "../components/model-viewer/3DViewer";
import {
  ProductConfigurator,
  ProductView,
} from "../components/ProductConfigurator";
import { Model } from "@google/model-viewer/lib/features/scene-graph/model";
import { Color } from "three/src/math/Color";
import { useCallback, useRef, useState } from "react";
import { ModelViewerElement } from "@google/model-viewer/src/model-viewer";

const toRGBA = (hex: string): [r: number, g: number, b: number, a: number] => {
  let color: [r: number, g: number, b: number] = new Color(hex)
    .convertSRGBToLinear()
    .toArray() as any;
  return [...color, 1];
};

const restoreMetalMaterials = (
  modelViewer: ModelViewerElement,
  materialNames: string[] = []
) => {
  modelViewer.model?.materials
    .filter((material) => materialNames.includes(material.name))
    .forEach((material) => {
      material.pbrMetallicRoughness.setRoughnessFactor(0.2);
    });
};

type MaterialReplacement = {
  name: string;
  color: string;
};

type ProductViewWithMaterialReplacements = ProductView & {
  materials: MaterialReplacement[];
};

export const Configurator3DViewer = ({ ...props }) => {
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  let onProductClick = useCallback(
    (view: ProductViewWithMaterialReplacements) => {
      if (!modelViewerRef.current) {
        return;
      }

      let model = modelViewerRef.current.model!;

      for (let materialReplacement of view.materials) {
        let material = model.materials.find(
          (material) => material.name === materialReplacement.name
        );

        console.log(material?.name);

        if (!material) {
          continue;
        }

        material.pbrMetallicRoughness.setBaseColorFactor(
          toRGBA(materialReplacement.color)
        );
        console.log(material.pbrMetallicRoughness.roughnessFactor);
      }
    },
    [modelViewerRef]
  );

  let renderView = ({}) => (
    <ModelViewer
      src="Rendering_Motorcycle_Anthracite_GLB.glb"
      onInitialization={(modelViewer) => {
        if (!modelViewer.model) {
          return;
        }

        modelViewerRef.current = modelViewer;
        onProductClick(views[0]);
        restoreMetalMaterials(modelViewer, ["metall glossy", "gray"]);
      }}
      auto-rotate
      camera-orbit="240deg 90deg 2.5m"
      {...props}
    ></ModelViewer>
  );

  let views: ProductViewWithMaterialReplacements[] = [
    {
      name: "neon-grün",
      color: "#5ABF16",
      materials: [
        {
          name: "decal",
          color: "#81DD93",
        },
        {
          name: "carpaint",
          color: "#176A26",
        },
      ],
      renderProductView: renderView,
    },
    {
      name: "dunkel-rot",
      color: "#E2001A",
      materials: [
        {
          name: "decal",
          color: "#FF4453",
        },
        {
          name: "carpaint",
          color: "#820409",
        },
      ],
      renderProductView: renderView,
    },
    {
      name: "anthrazit",
      color: "#1D212B",
      materials: [
        {
          name: "decal",
          color: "#09091F",
        },
        {
          name: "carpaint",
          color: "#040314",
        },
      ],
      renderProductView: renderView,
    },
    {
      name: "karamell-weiß",
      color: "#74675A",
      materials: [
        {
          name: "decal",
          color: "#FFF3F9",
        },
        {
          name: "carpaint",
          color: "#74675A",
        },
      ],
      renderProductView: renderView,
    },
  ];

  return (
    <ProductConfigurator
      views={views as ProductView[]}
      onProductClick={(view) =>
        onProductClick(view as ProductViewWithMaterialReplacements)
      }
    />
  );
};

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
    <ModelViewer src="Rendering_Motorcycle_Anthracite_GLB.glb" {...props}>
      <Annotations3DViewerHotspots />
    </ModelViewer>
  </div>
);

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"P1"}
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
