import * as css from "../../styles/06-prototypes/p1.module.scss";

export const getPrototypeStylesheet = (css: typeof import("*.module.scss")) => {
  return (css as unknown as PrototypeStylesheet).prototype;
};
