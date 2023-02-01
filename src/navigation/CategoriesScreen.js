/** @format */

import React, { PureComponent } from "react";
import { Color, Styles } from "@common";
import { NavBarLogo, NavBarMenu, NavBarEmpty } from "@components";
import { CategoriesContainer } from "@containers";

export default class CategoriesScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarLogo({ navigation }),
    headerLeft: NavBarMenu(),
    headerRight: NavBarEmpty(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <CategoriesContainer {...this.props} />;
  }
}
