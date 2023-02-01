/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withTheme } from "@callstack/react-theme-provider";
import { View, Text, Image } from "react-native";
import { Styles, Color } from "@common";
import { connect } from "react-redux";

const mapStateToProps = ({ carts, wishlist }) => ({ carts, wishlist });

@withTheme
@connect(mapStateToProps)
export default class TabBarIconContainer extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    css: PropTypes.any,
    carts: PropTypes.object,
    cartIcon: PropTypes.any,
    wishlist: PropTypes.any,
    wishlistIcon: PropTypes.any,
    focused: PropTypes.bool,
  };

  _renderNumberWrap = (number = 0) => {
    return (
      <View style={styles.numberWrap(this.props.theme)}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
  };

  render() {
    const {
      icon,
      css,
      carts,
      cartIcon,
      wishlist,
      wishlistIcon,
      theme,
      focused,
      icon1
    } = this.props;

    return (
      <View style={{ justifyContent: "center" }}>
        <Image
          source={focused ? icon1 : icon}
          style={[
            styles.icon,

            css,
          ]}
        />
      </View>
    );
  }
}

const styles = {
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },

};
