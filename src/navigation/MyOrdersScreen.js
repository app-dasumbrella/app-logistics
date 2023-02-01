/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { MyOrdersContainer } from "@containers";
import { NavBarMenu,NavBarTitle, NavBarLogo } from "@components";

export default class MyOrdersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
     // headerLeft: NavBarMenu({ navigation }),
     headerTitle: NavBarTitle({ title: 'Logistics' }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <MyOrdersContainer {...this.props} />;
  }
}
