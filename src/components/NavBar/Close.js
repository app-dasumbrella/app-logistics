/** @format */

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { isFunction } from "lodash";
import { Styles, Images } from "@common";
import { moderateScale } from "react-native-size-matters";

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const NavBarClose = ({
  navigation,
  icon,
  buttonStyle,
  imageStyle,
  onPress,
  manual
}) => (
  <TouchableOpacity
    hitSlop={hitSlop}

    style={{ width: moderateScale(70) }}
    onPress={() => {
      if (manual)
        onPress()
      else {
        isFunction(onPress) ? onPress() : navigation.goBack(null);
      }
    }}>
    <Image
      resizeMode="contain"
      source={icon || Images.icons.close}
      style={{
        paddingLeft: moderateScale(60),
        width: moderateScale(15), height: moderateScale(15),
      }}
    />
  </TouchableOpacity>
);

export default NavBarClose;
