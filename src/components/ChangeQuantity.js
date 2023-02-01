/** @format */

import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants, Color } from "@common";

export default class ChangeQuantity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({ quantity: nextProps.quantity });
    }
  }

  increase = () => {
    if (this.state.quantity < Constants.LimitAddToCart) {
      this.props.onChangeQuantity(this.state.quantity + 1);
    }
  };

  reduced = () => {
    if (this.state.quantity > 1) {
      this.props.onChangeQuantity(this.state.quantity - 1);
    }
  };

  render() {
    const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={styles.btnUp}
          hitSlop={hitSlop}
          onPress={this.increase}>
          <Icon name="md-add" size={20} color="#a3a3a9" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.quantity}</Text>
        <TouchableOpacity
          style={styles.btnDown}
          hitSlop={hitSlop}
          onPress={this.reduced}>
          <Icon name="md-remove" size={20} color="#a3a3a9" />
        </TouchableOpacity>
      </View>
    );
  }
}
ChangeQuantity.defaultProps = {
  quantity: 1,
  onChangeQuantity: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    fontFamily: Constants.fontFamily,
    color: Color.blackTextPrimary,
  },
  btnUp: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDown: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
