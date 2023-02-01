/** @format */

import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, Image, View } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Styles } from "@common";
import * as Animatable from "react-native-animatable";

@withTheme
export default class NavBarIcon extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.number &&
      this.refs.menu &&
      this.props.number !== nextProps.number
    ) {
      this.refs.menu.fadeInDown(600);
    }
  }

  render() {
    const { onPress, number, icon, color, size, style, theme } = this.props;
    const iconColor = color || "#333";

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[icon, style]}>
          <Image
            source={icon}
            style={[
              styles.icon,
              { tintColor: iconColor },
              {
                width: size || Styles.IconSize.ToolBar,
                height: size || Styles.IconSize.ToolBar,
              },
            ]}
            resizeMode="contain"
          />
          {!number ? null : (
            <Animatable.View ref="menu" style={styles.numberWrap(theme)}>
              <Text style={styles.number}>{number}</Text>
            </Animatable.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  iconWrap: {
    flex: 1,
    alignItems: "center",
  },
  numberWrap: (theme) => ({
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: 0,
    right: 10,
    height: 18,
    minWidth: 18,
    backgroundColor: theme.primaryColor,
    borderRadius: 9,
  }),
  number: {
    color: "white",
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
};

NavBarIcon.defaultProps = {
  number: 0,
};
