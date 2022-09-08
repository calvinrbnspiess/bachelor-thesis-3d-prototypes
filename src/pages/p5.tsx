import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p5.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { ModelViewer } from "../components/model-viewer/3DViewer";
import classnames from "classnames";
import {
  Annotations3DViewerHotspots,
  changeProductMaterials,
  Configurator3DViewer,
  getProductViews,
  ProductViewWithMaterialReplacements,
} from "./p1";
import {
  ProductConfigurator,
  ProductView,
} from "../components/ProductConfigurator";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModelViewerElement } from "@google/model-viewer/src/model-viewer";
import { clampFromMax, clampFromMin } from "../helpers/math";

const Prototype: NextPage = () => {
  const [annotationVisibility, setAnnotationVisibility] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement | null>(null);
  const annotationContainerRef = useRef<HTMLDivElement>(null);

  const updateAnnotationVisibility = useCallback(() => {}, []);

  useEffect(() => {
    if (!annotationContainerRef.current) {
      return;
    }

    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    console.log("init intersection observer");

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log("intersect", entry);
          setAnnotationVisibility(true);
        } else {
          setAnnotationVisibility(false);
        }
      });
    }, options);

    observer.observe(annotationContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [annotationContainerRef]);

  return (
    <PrototypePage
      id={"P5"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={
        <ModelViewer
          src="Rendering_Motorcycle_Anthracite_GLB_DRACO.glb"
          camera-orbit="230deg 75deg 105%"
          onInitialization={(modelViewer) => {
            console.log("init p4 hero");

            modelViewerRef.current = modelViewer;

            let updateCameraOrbit = () => {
              let scrollPercentage =
                document.body.scrollTop / document.body.scrollHeight;

              let theta = clampFromMin(230, 360 * 0.5 * scrollPercentage, 270);
              let phi = clampFromMax(60, 360 * 0.25 * scrollPercentage, 75);
              let zoom = clampFromMax(75, scrollPercentage * 100, 105);

              let orbit = `${theta}deg ${phi}deg ${zoom}%`;

              modelViewer.cameraOrbit = orbit;
            };

            document.body.addEventListener("scroll", updateCameraOrbit);

            updateCameraOrbit();
          }}
        >
          <Annotations3DViewerHotspots
            visibility={annotationVisibility}
            largeMarkers
          />
        </ModelViewer>
      }
      configuratorSlot={
        <ProductConfigurator
          views={getProductViews() as ProductView[]}
          onProductClick={(view) =>
            changeProductMaterials(
              modelViewerRef.current,
              view as ProductViewWithMaterialReplacements
            )
          }
          defaultView={2}
        />
      }
      annotationsSlot={
        <div
          className={classnames(
            "annotation-graphic",
            "annotation-graphic__container"
          )}
          ref={annotationContainerRef}
        ></div>
      }
    />
  );
};

export default Prototype;
