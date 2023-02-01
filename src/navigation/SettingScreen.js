/** @format */

import React, { Component } from "react";

import { Languages, Styles, Color } from "@common";
import { Setting } from "@containers";
import { NavBarMenu } from "@components";

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.Settings,
    headerLeft: NavBarMenu(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTutleStyle,
  });
  render() {
    return <Setting />;
  }
}
