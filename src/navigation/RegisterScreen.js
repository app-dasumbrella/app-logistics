/** @format */

import React, { PureComponent } from "react";
import { RegisterContainer } from "@containers";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty } from "@components";

export default class RegisterScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarEmpty(),
    headerTitle: NavBarTitle({ title: Languages.Register }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <RegisterContainer {...this.props} />;
  }
}
