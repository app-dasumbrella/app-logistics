/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, I18nManager, Text } from "react-native";
import { Styles, Color, Constants, Languages } from "@common";
import { Icon } from "@app/Omni";

class DrawerButton extends PureComponent {
  render() {
    const { text, onPress, icon, uppercase, isActive } = this.props;
    const transText = text !== "" && Languages[text] ? Languages[text] : text;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.container,
          isActive && {
            borderLeftWidth: 1,
            borderColor: Color.SideMenuTextActived,
          },
        ]}
        onPress={onPress}>
        <Icon
          name={icon}
          color={Color.SideMenuTextActived}
          size={20}
          style={styles.icon}
        />
        <Text
          style={[
            styles.text,
            isActive && { color: Color.SideMenuTextActived },
            I18nManager.isRTL && { paddingRight: 20 },
          ]}>
          {uppercase ? transText.toUpperCase() : transText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterLeft,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    padding: 4,
    color: Color.SideMenuText,
    fontSize: Styles.FontSize.big,
    fontFamily: Constants.fontFamily,
  },
});

DrawerButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  uppercase: PropTypes.bool,
  isActive: PropTypes.bool,
};

DrawerButton.defaultProps = {
  uppercase: false,
  isActive: false,
  text: "Default button name",
  onPress: () => alert("Drawer button clicked"),
};

export default DrawerButton;
