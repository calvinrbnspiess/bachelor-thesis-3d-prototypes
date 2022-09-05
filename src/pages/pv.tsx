import type { NextPage } from "next";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p1.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { AnnotationsGraphic } from "../components/AnnotationsGraphic";
import content from "../content";
import { ProductConfigurator } from "../components/ProductConfigurator";

const Prototype: NextPage = () => {
  return (
    <PrototypePage
      id={"PV"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<img src={content.renderImage} />}
      configuratorSlot={
        <ProductConfigurator
          views={[
            {
              name: "dunkel-rot",
              color: "#E2001A",
              renderProductView: () => (
                <img
                  src={"motorcycle-02-09-render2-1512-dark-red.png"}
                  style={{
                    maxWidth: "600px",
                  }}
                />
              ),
            },
            {
              name: "karamell-weiß",
              color: "#FFFFFF",
              renderProductView: () => (
                <img
                  src={"motorcycle-02-09-render1-1512-white.png"}
                  style={{
                    maxWidth: "600px",
                  }}
                />
              ),
            },
            {
              name: "neon-grün",
              color: "#5ABF16",
              renderProductView: () => (
                <img
                  src={"motorcycle-02-09-render1-1512-dark-green.png"}
                  style={{
                    maxWidth: "600px",
                  }}
                />
              ),
            },
            {
              name: "anthrazit",
              color: "#1D212B",
              renderProductView: () => (
                <img
                  src={"motorcycle-01-09-render4-1512-dark-blue.png"}
                  style={{
                    maxWidth: "600px",
                  }}
                />
              ),
            },
          ]}
        />
      }
      annotationsSlot={
        <AnnotationsGraphic
          src={content.renderImage}
          markers={[
            {
              label: content.markers.tachometer,
              x: 0.41,
              y: 0.25,
            },
            {
              label: content.markers.lights,
              x: 0.24,
              y: 0.38,
            },
            {
              label: content.markers.capacity,
              x: 0.58,
              y: 0.655,
            },
            {
              label: content.markers.indicators,
              x: 0.94,
              y: 0.425,
            },
          ]}
        ></AnnotationsGraphic>
      }
    />
  );
};

export default Prototype;
