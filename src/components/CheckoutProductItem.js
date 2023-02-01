/** @format */

import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { isFunction } from "lodash";
import { Color, Tools, Constants } from "@common";

export default class CheckoutProductItem extends PureComponent {
  _handlePress = () => {
    if (isFunction(this.props.onPress)) {
      this.props.onPress();
    }
  };

  render() {
    const { name, price, quantity } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this._handlePress}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{Tools.getPrice(price)}</Text>
          <Text style={styles.price}>{quantity}X</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1.3,
    flexWrap: "wrap",
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: "row",
    flex: 0.7,
    justifyContent: "space-between",
  },
  title: {
    color: Color.TextDefault,
    fontSize: 16,
    fontFamily: Constants.fontFamily,
  },
  price: {
    color: Color.Text,
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
});
