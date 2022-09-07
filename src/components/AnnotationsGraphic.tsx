import {
  PropsWithChildren,
  CSSProperties,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import classnames from "classnames";

type ImageMarkerProps = {
  label: string;
  x: number;
  y: number;
};

const ImageMarker = ({ label, x, y }: ImageMarkerProps) => {
  const [isOpen, setOpen] = useState(false);

  let style = {
    "--position-x": x + "px",
    "--position-y": y + "px",
  } as CSSProperties;

  return (
    <div
      className={classnames("image-marker", isOpen && "image-marker--open")}
      style={style}
    >
      <label className={"image-marker__label"}>{label}</label>
      <span className={"image-marker__indicator"} />
    </div>
  );
};

type AnnotationsGraphicProps = {
  src: string;
  markers: {
    label: string;
    x: number;
    y: number;
  }[];
};

export const AnnotationsGraphic = ({
  markers,
  src,
}: AnnotationsGraphicProps) => {
  const graphic = useRef<HTMLImageElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0,
  });

  const updateDimensions = useCallback(() => {
    if (!graphic.current) {
      return;
    }

    let boundings = graphic.current.getBoundingClientRect();
    setDimensions({
      width: boundings.width,
      height: boundings.height,
      offsetTop: graphic.current.offsetTop,
      offsetLeft: graphic.current.offsetLeft,
    });
  }, [dimensions, graphic]);

  useEffect(() => {
    if (!graphic.current) {
      return;
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [graphic]);

  return (
    <div
      className={classnames(
        "annotation-graphic",
        "annotation-graphic__container"
      )}
    >
      {dimensions.width &&
        dimensions.height &&
        markers.map((marker, index) => (
          <ImageMarker
            label={marker.label}
            x={dimensions.offsetLeft + dimensions.width * marker.x}
            y={dimensions.offsetTop + dimensions.height * marker.y}
            key={index}
          />
        ))}
      <img ref={graphic} src={src} onLoad={updateDimensions} />
    </div>
  );
};
