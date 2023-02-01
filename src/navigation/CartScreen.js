/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { CartContainer } from "@containers";
import { HeaderWithImage } from "@components";
import { Languages } from "@common";

export default class CartScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderWithImage
          title={Languages.Cart}
          content={<CartContainer {...this.props} />}
        />
      </View>
    );
  }
}
