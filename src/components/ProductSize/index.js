/** @format */

import React from "react";
import { withTheme } from "@callstack/react-theme-provider";
import { TouchableOpacity, Text } from "react-native";
import { Constants } from "@common";

const ProductSize = withTheme((props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      props.text.length > 6 ? styles.containerLong : styles.container,
      props.style,
      props.selected && styles.active(props.theme),
    ]}
    activeOpacity={0.8}
    underlayColor="transparent">
    <Text
      style={[
        styles.text,
        props.selected && { color: "white" },
        props.text.length > 2 && { paddingHorizontal: 5 }, props.style2,
      ]}>
      {props.text}
    </Text>
  </TouchableOpacity>
));

const styles = {
  active: (theme) => ({
    backgroundColor: theme.primaryColor,
  }),
  container: {
    width: 100,
    height: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  containerLong: {
    width: null,
    height: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  text: {
    color: "#C6D8E4",
    fontSize: 28,
    fontFamily: Constants.fontFamily,
  },
};

export default ProductSize;
