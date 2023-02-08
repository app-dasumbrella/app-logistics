/** @format */

import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, Languages, Constants } from "@common";
import { Button } from "@components";

/**
 * TODO: refactor
 */
export default class ShippingAddressItem extends PureComponent {
  static defaultProps = {
    selected: false,
  };

  render() {
    const {
      selected,
      onPress,
      address,
      onPressEdit,
      onPressRemove,
      style,
    } = this.props;
    console.log(address)
    return (
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <View style={[styles.container, style]}>
          {onPressRemove &&
            !selected && (
              <Button
                onPress={onPressRemove}
                icon={
                  <Icon
                    name="ios-remove-circle-outline"
                    size={20}
                    color={Color.Error}
                  />
                }
                style={styles.iconRemove}
                transparent
                type="icon"
              />
            )}
          <View
            style={[
              styles.textContainer,
              selected && styles.textSelectedContainer,
            ]}>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address.firstName}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address.phone}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address.address1}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address.city} {address.province} {address.country}
            </Text>
          </View>
          <View style={styles.rightAction}>
            {selected && (
              <Button
                text={Languages.Actived.toUpperCase()}
                transparent
                type="text"
                textStyle={{ color: "#ed6d03" }}
                style={{ marginBottom: 10 }}
              />
            )}
            <Button
              onPress={onPressEdit}
              text={Languages.Edit.toUpperCase()}
              transparent
              type="text"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.green,
    backgroundColor: "#FFF",
  },
  rightAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 20,
  },
  icon: {
    alignSelf: "center",
    marginTop: 10,
  },
  iconRemove: {
    alignSelf: "center",
  },
  content: {
    // borderRadius: 12,
  },
  selected: {
    alignItems: "center",
    height: 20,
    marginBottom: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textSelectedContainer: {
    marginLeft: 18,
  },
  edit: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textEdit: {
    color: Color.yellow,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "transparent",
    color: Color.TextDefault,
    //fontFamily: Constants.fontFamily,
  },
  textSelected: {
    color: "#333",
  },
});
