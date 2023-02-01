/** @format */

import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default class CheckoutProductItem extends PureComponent {
  render() {
    const { address } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{address.firstName}</Text>
        <Text style={styles.text}>{address.phone}</Text>
        <Text style={styles.text}>{address.address1}</Text>
        <Text style={styles.text}>
          {address.city} {address.province} {address.country}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "transparent",
    color: Color.TextDefault,
    fontFamily: Constants.fontFamily,
  },
});
