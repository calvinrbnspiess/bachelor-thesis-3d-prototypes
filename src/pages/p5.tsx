import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p2.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import {
  changeProductMaterials,
  Configurator3DViewer,
  getProductViews,
  toRGBA,
} from "./p1";
import content from "../content";
import { ModelViewerElement } from "@google/model-viewer/src/model-viewer";
import { useState } from "react";
import { AnnotationsGraphic } from "../components/AnnotationsGraphic";
import { markers } from "./pv";

const Prototype: NextPage = () => {
  const [productConfiguratorView, setProductConfiguratorView] =
    useState<number>(0);

  return (
    <PrototypePage
      id={"P2"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<img src={content.renderImage} />}
      configuratorSlot={
        <Configurator3DViewer
          camera-controls
          autoRotate={false}
          data-js-focus-visible
          interaction-prompt={"none"}
          autoplay
          src={"Rendering_Motorcycle_Anthracite_PIPETTE_GLB.glb"}
          defaultView={productConfiguratorView}
          onInitialization={(modelViewer: ModelViewerElement) => {
            modelViewer.addEventListener("click", (event) => {
              const material = modelViewer.materialFromPoint(
                event.clientX,
                event.clientY
              );

              if (material && material.name.startsWith("pipette-color")) {
                let originalColor =
                  material?.pbrMetallicRoughness.baseColorFactor;
                material?.pbrMetallicRoughness.setBaseColorFactor(
                  toRGBA("#ffffff")
                );

                setTimeout(() => {
                  material?.pbrMetallicRoughness.setBaseColorFactor(
                    originalColor
                  );
                }, 240);

                let productViews = getProductViews();
                let view =
                  productViews.find((view) => {
                    return (
                      view.name ===
                      material.name
                        .replace("pipette-color", "")
                        .replace("-", "")
                    );
                  }) || productViews[0];

                changeProductMaterials(modelViewer, view || productViews[0]);
                setProductConfiguratorView(productViews.indexOf(view));
              }
            });
          }}
        />
      }
      annotationsSlot={
        <AnnotationsGraphic
          src={content.renderImage}
          markers={markers}
        ></AnnotationsGraphic>
      }
    />
  );
};

export default Prototype;
