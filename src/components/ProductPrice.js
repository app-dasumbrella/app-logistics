/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withTheme } from "@callstack/react-theme-provider";
import { View, Text } from "react-native";
import { Tools, Constants, Color, Styles } from "@common";

@withTheme
export default class ProductPrice extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    hideDisCount: PropTypes.bool,
    style: PropTypes.any,
  };

  render() {
    const { product, hideDisCount, style, theme } = this.props;
    console.log("PPPPPPPPP", product)
    return (
      <View style={[styles.priceWrapper, style]}>
        <Text style={[styles.textList, styles.price]}>
          {`${Tools.getPrice(product.variants && product.variants[0] &&
            product.variants[0].sale_price)} `}
        </Text>
        <Text style={[styles.textList, styles.salePrice]}>
          {product.onSale ? Tools.getPrice(product.regularPrice) : ""}
        </Text>
        {hideDisCount && !product.onSale ? (
          <View />
        ) : (
          <View style={styles.saleWrap(theme)}>
            <Text style={[styles.textList, styles.saleOff]}>
              {Tools.getPriceDiscount(product)}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  priceWrapper: {
    flexDirection: "row",
  },
  textList: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    //fontFamily: Constants.fontFamily,
  },
  salePrice: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.tiny,
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
    //fontFamily: Constants.fontFamily,
  },
  saleWrap: (theme) => ({
    borderRadius: 5,
    backgroundColor: theme.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  }),
  saleOff: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,
  },
};
