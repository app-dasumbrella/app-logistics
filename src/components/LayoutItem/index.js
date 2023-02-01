/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Constants, Styles, Tools } from "@common";

import MiniBanner from "./MiniBanner";
import Item from "./Item";

/**
 * TODO: refactore
 */
export default class LayoutItem extends PureComponent {
  static propTypes = {
    layout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    layout: Constants.Layout.threeColumn,
  };

  _getProps = () => {
    const { onPress, product, index, imageURI,mode } = this.props||{};
    const size = this._getSizeItem();
    let props = {};
     if (!product && imageURI) {
    
      props = {
        onPress,
        imageURI,
        size,
        index,
        mode
      };
    } else {
      
      // console.log(product,"product")
      const imageURI = Tools.getProductImage(
        product.gallery && product.gallery[0] && product.gallery[0].url,
        Styles.window.width
      );
      const productPrice = `${Tools.getPrice(product.variants &&product.variants[0] &&
          product.variants[0].sale_price
      )} `;
      const productPriceSale = product.onSale
        ? `${Tools.getPrice(product.regularPrice)} `
        : null;
      props = {
        onPress,
        imageURI,
        title: product.title,
        product,
        productPrice,
        productPriceSale,
        index,
        size,
        ppp:mode
      };
    }

    return props;
  };

  _getSizeItem = () => {
    return Styles.LayoutCard[`layout${this.props.layout}`];
  };

  render() {
    const { layout,mode } = this.props;
    const props = this._getProps();

    switch (layout) {
      case Constants.Layout.miniBanner:
        return <MiniBanner  {...props} />;

      default:
        return <Item  {...props} />;
    }
  }
}
