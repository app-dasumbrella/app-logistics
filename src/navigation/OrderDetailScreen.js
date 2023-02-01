/** @format */

import React, { Component } from "react";

import { Color, Styles } from "@common";
import { OrderDetailContainer } from "@containers";
import { NavBarClose, NavBarLogo } from "@components";

export default class OrderDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    
    headerLeft: NavBarClose({ navigation }),
    tabBarVisible: false,

    
   
  });

  render() {
    return <OrderDetailContainer {...this.props} />;
  }
}
