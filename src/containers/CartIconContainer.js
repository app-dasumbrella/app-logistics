/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { Constants, Images } from "@common";
import { connect } from "react-redux";
import { NavBarIcon } from "@components";

const mapStateToProps = ({ carts }) => ({
  carts,
});

@withNavigation
@connect(mapStateToProps)
export default class CartIconContainer extends PureComponent {
  render() {
    const { carts, navigation } = this.props;
    const totalCart = carts.total;

    return (
      <View
        style={[
          { flexDirection: "row", flex: 1 },
          Constants.RTL ? { left: 10 } : { right: 10 },
        ]}>
        <NavBarIcon
          style={{ padding: 20, paddingTop: 10, flex: 1 }}
          icon={Images.IconCartTop}
          number={totalCart}
          onPress={() => navigation.navigate("CartScreen")}
        />
      </View>
    );
  }
}
