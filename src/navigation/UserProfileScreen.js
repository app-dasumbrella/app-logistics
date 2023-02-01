/** @format */

import React, { PureComponent } from "react";
import { UserProfileContainer } from "@containers";
import { NavBarLogo, NavBarMenu } from "@components";
import { Color, Styles } from "@common";

export default class UserProfileScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarMenu({ navigation }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <UserProfileContainer {...this.props} />;
  }
}
