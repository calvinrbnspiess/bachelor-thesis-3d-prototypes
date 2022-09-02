import type { NextPage } from "next";
import Head from "next/head";
import classnames from "classnames";
import PrototypePage from "../components/PrototypePage";
import * as css from "../../styles/06-prototypes/p1.module.scss";
import { getPrototypeStylesheet } from "../helpers/styles";
import { AnnotationsGraphic } from "../components/AnnotationsGraphic";
import content from "../content";

const Home: NextPage = () => {
  return (
    <PrototypePage
      id={"PV"}
      className={getPrototypeStylesheet(css)}
      heroMediaSlot={<img src={content.renderImage} />}
      configuratorSlot={
        <img
          src={content.renderImage}
          style={{
            maxWidth: "600px",
          }}
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

export default Home;
