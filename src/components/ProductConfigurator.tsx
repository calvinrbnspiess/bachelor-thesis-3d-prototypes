import classnames from "classnames";
import { CSSProperties, ReactNode, useState } from "react";

export type ProductView = {
  name: string;
  color: string;
  renderProductView: (props: { productView: ProductView }) => ReactNode;
};

export const ProductConfigurator = (props: {
  views: ProductView[];
  onProductClick?: (productView: ProductView) => void;
  defaultView?: number;
}) => {
  const { views, defaultView, onProductClick = () => {} } = props;
  const [productView, setProductView] = useState(views[defaultView || 0]);

  return (
    <div
      className={classnames(
        "product-configurator",
        "product-configurator__container"
      )}
    >
      <div className={classnames("product-configurator__details")}>
        <h2 className={classnames("section__headline")}>
          Die passende Farbe parat
        </h2>
        <p>
          Vier spannende Farbvarianten garantieren dir deine ganz individuelle
          Z900. Somit ist dein neues Motorrad ganz nach deinem Geschmack.
        </p>
        <div className={classnames("color-picker", "color-picker__container")}>
          {views.map((view) => (
            <span
              className={classnames(
                "color-picker__item",
                productView === view && "color-picker__item--active"
              )}
              onClick={() => {
                setProductView(view);
                onProductClick(view);
              }}
              style={
                {
                  "--color": view.color,
                } as CSSProperties
              }
              key={view.color}
            />
          ))}
        </div>
      </div>
      <div className={classnames("product-configurator__view")}>
        <div className={classnames("product-configurator__view-content")}>
          {productView.renderProductView({ productView })}
        </div>
        <label className={"label"}>{productView.name}</label>
      </div>
    </div>
  );
};
