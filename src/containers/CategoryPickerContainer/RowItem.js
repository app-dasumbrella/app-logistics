/**
 * Created by InspireUI on 03/03/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Styles, Color, Icons } from "@common";
import { Icon } from "@app/Omni";

export default class RowItem extends PureComponent {
  render() {
    const { onPress, category, isSelect, isFirst } = this.props;
    return (
      <View style={[styles.container, isFirst ? { borderTopWidth: 0 } : {}]}>
        <TouchableOpacity style={styles.subContainer} onPress={onPress}>
          <View style={styles.checkboxWrap}>
            {isSelect ? (
              <Icon
                name={Icons.MaterialCommunityIcons.CheckMark}
                size={20}
                color={Color.accent}
              />
            ) : null}
          </View>
          <Text style={styles.text}>
            {(isFirst ? "" : "--- ") + category.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: Color.blackDivide,
    borderTopWidth: 1,
  },
  subContainer: {
    ...Styles.Common.RowCenterLeft,
    padding: 20,
  },
  checkboxWrap: {
    height: 20,
    width: 20,
    borderColor: Color.blackTextSecondary,
    borderWidth: 1,
    borderRadius: 5,
    ...Styles.Common.ColumnCenter,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextPrimary,
  },
});

RowItem.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  isSelect: PropTypes.bool,
  isFirst: PropTypes.bool,
};
