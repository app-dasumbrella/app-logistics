/** @format */

import React, { PureComponent } from "react";
import { Languages, Color, Styles } from "@common";
import { StockInHandContainer } from "@containers";
import { NavBarTitle, NavBarBack, NavBarLogo } from "@components";

export default class StockInHandScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({


    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <StockInHandContainer {...this.props} />;
  }
}
