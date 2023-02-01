/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { CustomPage } from "@containers";
import { NavBarMenu, NavBarLogo } from "@components";
import { Styles } from "@common";
import { WebView } from 'react-native-webview';

export default class CustomPageScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: NavBarMenu(),

      headerStyle: Styles.Common.headerStyle,
      headerTitleStyle: Styles.Common.headerTitleStyle,
    };
  };

  render() {
    const { state } = this.props.navigation;
    if (typeof state.params === "undefined") {
      return <View />;
    }

    if (typeof state.params.url !== "undefined") {
      return <WebView source={{ uri: state.params.url }} />;
    }

    return <CustomPage id={state.params.id} />;
  }
}
