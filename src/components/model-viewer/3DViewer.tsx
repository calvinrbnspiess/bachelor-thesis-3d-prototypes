import { PropsWithChildren, useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export const ModelViewer = ({
  children,
  ...props
}: PropsWithChildren & { [key: string]: any }) => {
  const modelViewer = useRef<HTMLElement & { loaded: boolean }>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!modelViewer.current) {
      return;
    }

    modelViewer.current.addEventListener("load", () => {
      setLoaded(true);
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
        <model-viewer ref={modelViewer} {...props}>
          <div slot="progress-bar"></div>
          {loaded ? children : null}
        </model-viewer>
      ) : (
        <span>Loading ...</span>
      )}
    </>
  );
};
