/** @format */

import React, { PureComponent } from "react";
import { LoginContainer } from "@containers";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty } from "@components";

export default class LoginScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
   headerLeft:  NavBarEmpty(),
    headerRight: NavBarEmpty(),
    headerTitle: NavBarTitle({ title: Languages.Login }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <LoginContainer statusBar />;
  }
}
