/** @format */

import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import { WishListIconContainer, AddToCartIconContainer } from "@containers";
import { ProductPrice, ImageCache } from "@components";
import { Color, Constants } from "@common";

export default class LayoutItem extends PureComponent {
  render() {
    const { onPress,mode, title, product, imageURI, size } = this.props;
    console.log(this.props,"SwwwwwwSSSSSSSSSS")

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={onPress}>
        <ImageCache
              mode={mode}

          uri={imageURI}
          style={[styles.image, { width: size.width, height: size.height }]}
        />
        <Text numberOfLines={1} style={[styles.text, { width: size.width }]}>
          {title}
        </Text>

        <View style={[styles.rowBottom, { width: size.width }]}>
          <ProductPrice product={product} hideDisCount />
          <AddToCartIconContainer product={product} />
        </View>

        <WishListIconContainer product={product} />
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    alignItems: "flex-start",
    marginBottom: 12,
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  image: {
    overflow: "hidden",
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: Platform.OS === "android" ? 24 : 20,
    color: Color.TextDefault,
    fontFamily: Constants.fontFamilyBold,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  rowBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
