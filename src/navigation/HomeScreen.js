/** @format */

import React, { Component } from "react";
import { HomeContainer } from "@containers";
import { NavBarMenu, NavBarCart, NavBarLogo } from "@components";
import { Styles } from "@common";

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: NavBarMenu(),
      headerRight: NavBarCart(),

      headerStyle: Styles.Common.headerStyle,
      headerTitleStyle: Styles.Common.headerTitleStyle,
    };
  };

  render() {
    return <HomeContainer {...this.props} />;
  }
}
