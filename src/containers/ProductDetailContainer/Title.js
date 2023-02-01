/** @format */

import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Tools } from "@common";
import styles from "./styles";

export default class ProductDetailTitle extends PureComponent {
  render() {
    const { product, selectedVariant } = this.props;
    console.log(product && product.variants && product.variants[0], "sss");
    // selectedVariant
    //     ? selectedVariant.price
    //     :
    const productPrice = Tools.getPrice(selectedVariant&&selectedVariant.sale_price);
    //selectedVariant ? selectedVariant.regularPrice :
    const productRegularPrice = Tools.getPrice(selectedVariant&&selectedVariant.regular_price);
    const isOnSale = selectedVariant ? selectedVariant.onSale : product.onSale;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <View style={styles.productTitle}>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productTypeName}>{product.productType}</Text>
        </View>
        <Animatable.Text animation="fadeInDown" style={styles.productPrice}>
          {productPrice}
        </Animatable.Text>
        {isOnSale && (
          <Animatable.Text
            animation="fadeInDown"
            style={styles.productPriceSale}
          >
            {productRegularPrice}
          </Animatable.Text>
        )}
      </View>
    );
  }
}
