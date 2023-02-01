/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import { View, StatusBar } from "react-native";
import { Config, Device, Styles } from "@common";
import {SafeAreaView} from "react-navigation"
import {
  MyToastContainer,
  MyNetInfoContainer,
  // AppIntroContainer,
  LeftMenuContainer,
} from "@containers";
import Navigation from "@navigation";
import { connect } from "react-redux";
import { initialApp } from "@redux/operations";
import { toast, closeDrawer } from "./Omni";

const mapStateToProps = ({ app }) => ({
  shopify: app.shopify,
});

@connect(
  mapStateToProps,
  { initialApp }
)
export default class Router extends PureComponent {
  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }
    this.navigator.dispatch({ type: "Navigation/NAVIGATE", routeName, params });
    closeDrawer();
  };

  render() {
    return (
      <LeftMenuContainer
        goToScreen={this.goToScreen}
        type="scale" // default type sidemenu typeof "overlay", "small", "wide", default "scale"
        routes={
          <SafeAreaView forceInset={{ top: 'never'}} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={Styles.Common.appContainer}>
              <StatusBar
                hidden={Device.isIphoneX ? false : !Config.showStatusBar}
              />
              <Navigation ref={(comp) => (this.navigator = comp)} />
              <MyToastContainer />
              <MyNetInfoContainer />
            </View>
          </SafeAreaView>
        }
      />
    );
  }
}
