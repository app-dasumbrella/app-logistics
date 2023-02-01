/** @format */

import React, { PureComponent } from "react";
import { Color, Images, Styles } from "@common";
import { TabBarIconContainer, CategoryContainer } from "@containers";
import { NavBarLogo, NavBarBack, NavBarEmpty } from "@components";

export default class CategoryScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarBack({ navigation }),
    headerRight: NavBarEmpty(),
    tabBarIcon: ({ tintColor }) => (
      <TabBarIconContainer
        css={{ width: 18, height: 18 }}
        icon={Images.IconCategory}
        tintColor={tintColor}
      />
    ),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <CategoryContainer {...this.props} />;
  }
}
