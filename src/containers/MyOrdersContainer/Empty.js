/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Languages, Images } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

@withNavigation
export default class MyOrdersEmpty extends PureComponent {
  _handleNavigate = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.content}>
          <View>
            <Image
              source={Images.IconOrder}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.titleEmpty}>{Languages.MyOrder}</Text>
          <Text style={styles.message}>{this.props.text}</Text>

          <ShopButton
            onPress={this.props.onReload}
            text={Languages.reload}
            style={{
              backgroundColor: "#ccc",
              marginTop: 20,
              width: 120,
              height: 40,
            }}
          />
        </View>

        <ShopButton onPress={this._handleNavigate} />
      </View>
    );
  }
}
