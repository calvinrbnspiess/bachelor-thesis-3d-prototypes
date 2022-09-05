import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ModelViewerElement } from "@google/model-viewer/src/model-viewer";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export const ModelViewer = ({
  children,
  onInitialization = () => {},
  ...props
}: PropsWithChildren & {
  [key: string]: any;
  onInitialization?: (modelViewer: ModelViewerElement) => void;
}) => {
  const modelViewer = useRef<ModelViewerElement & { loaded: boolean }>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!modelViewer.current) {
      return;
    }

    modelViewer.current.addEventListener("load", () => {
      setLoaded(true);
      onInitialization(modelViewer.current as ModelViewerElement);
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
