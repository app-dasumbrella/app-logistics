/** @format */

import React from "react";
import { TouchableOpacity, Image, I18nManager } from "react-native";
import { Images, Styles } from "@common";
import { toggleDrawer } from "@app/Omni";

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const NavBarMenu = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={toggleDrawer}>
    <Image
      source={Images.icons.menu}
      style={[
        Styles.Common.toolbarIcon,
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

export default NavBarMenu;
