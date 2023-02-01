/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { ProductDetailContainer } from "@containers";
import { NavBarClose, NavBarCart } from "@components";

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <ProductDetailContainer {...this.props} />;
  }
}
