/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { Languages, Tools } from "@common";
import { Button } from "@components";
import styles from "./styles";

export default class UserProfileHeader extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  render() {
    const { user, onPress } = this.props;
    const avatar =user&&user.photo?{uri:user.photo}: Tools.getAvatar(user);
console.log(user)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{user.name}</Text>
            {user &&
              user.address && (
                <Text style={styles.address}>{user.address}</Text>
              )}
          </View>
          <Button
            onPress={onPress}
            style={styles.button}
            textStyle={styles.textButton}
            type="text"
            transparent
            text={
              user.name === Languages.Guest
                ? Languages.Login.toUpperCase()
                : Languages.Logout.toUpperCase()
            }
          />
        </View>
      </View>
    );
  }
}
