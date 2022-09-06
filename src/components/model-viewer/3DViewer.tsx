import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ModelViewerElement } from "@google/model-viewer/src/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

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

export const ModelViewer = ({
  children,
  onInitialization = () => {},
  disableEnhancements = false,
  ...props
}: PropsWithChildren & {
  [key: string]: any;
  onInitialization?: (modelViewer: ModelViewerElement) => void;
  disableEnhancements?: boolean;
}) => {
  const modelViewer = useRef<ModelViewerElement & { loaded: boolean }>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let modelViewerElement = modelViewer.current as ModelViewerElement;

    if (!modelViewerElement) {
      return;
    }

    modelViewerElement.addEventListener("load", () => {
      setLoaded(true);

      if (!disableEnhancements) {
        restoreMetalMaterials(modelViewerElement, ["metall glossy", "gray"]);
      }

      onInitialization(modelViewerElement);
    });
  }, [loaded, libraryLoaded, modelViewer]);

  useEffect(() => {
    if (!typeof window) {
      return;
    }

    (async () => {
      // @ts-ignore
      await import("@google/model-viewer");
      setLibraryLoaded(true);
    })();
  }, []);

  return (
    <>
      {libraryLoaded ? (
        <model-viewer
          ref={modelViewer}
          shadow-intensity="1.25"
          environment-image="studio_small_08_1k.hdr"
          exposure="0.75"
          shadow-softness="0.3"
          {...props}
        >
          <div slot="progress-bar"></div>
          {loaded ? children : null}
        </model-viewer>
      ) : (
        <span>Loading ...</span>
      )}
    </>
  );
};
