/** @format */

import React, { PureComponent } from "react";
import { View, FlatList, Alert, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { updateUserDefaultAddress, deleteUserAddress } from "@redux/operations";
import { UserAddressItem, Button } from "@components";
import { Languages, Styles, Constants, Color } from "@common";

const mapStateToProps = ({ user }) => {
  return {
    accessToken: user.accessToken,
    userInfo: user.userInfo,
  };
};

@connect(
  mapStateToProps,
  { updateUserDefaultAddress, deleteUserAddress }
)
export default class UserAddressContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      addresses: props.userInfo ? props.userInfo.addresses : [],
      defaultAddress: props.userInfo ? props.userInfo.defaultAddress : {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userInfo && nextProps.userInfo) {
      if (this.props.userInfo !== nextProps.userInfo) {
        const { userInfo } = nextProps;
        this.setState({
          addresses: userInfo.addresses,
          defaultAddress: userInfo.defaultAddress,
        });
      }
    }
  }

  _onSelect = (address, selected) => {
    if (!selected) {
      const { accessToken } = this.props;
      // update user default address
      // this.props.updateUserDefaultAddress({
      //   addressId: address.id,
      //   accessToken,
      // });
    }
  };

  _onPressAddAddress = () => {
    this.props.navigation.navigate("UserAddressFormScreen");
  };

  _onPressEdit = (address) => {
    this.props.navigation.navigate("UserAddressFormScreen", { address });
  };

  /**
   * TODO: enhance later
   */
  _onPressRemove = (address) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to remove the address?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            this.props.deleteUserAddress({ id: address.id }),
        },
      ],
      { cancelable: false }
    );
  };

  _isLastItem = (index) => {
    return index === this.state.addresses.length - 1;
  };

  _renderItem = ({ item, index }) => {
    const { defaultAddress } = this.state;
    const selected = defaultAddress.id === item.id;
    const onSelect = () => this._onSelect(item, selected);
    const onPressEdit = () => this._onPressEdit(item);
    const onPressRemove = () => this._onPressRemove(item);
    console.log(selected)
    return (
      <UserAddressItem
        address={item}
        onPress={onSelect}
        onPressEdit={onPressEdit}
        onPressRemove={onPressRemove}
        style={[
          styles.addressItem,
          this._isLastItem(index) && {
            borderBottomWidth: 0,
          },
        ]}
        selected={selected}
      />
    );
  };

  _renderEmpty = () => {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{Languages.EmptyAddress}</Text>
        </View>
        <View style={styles.bottomView}>
          <Button
            style={styles.button}
            text={Languages.AddAddress}
            onPress={this._onPressAddAddress}
          />
        </View>
      </View>
    );
  };

  render() {
    const { addresses } = this.state;

   
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
       {addresses && addresses.length !== 0&& <View style={Styles.Common.CheckoutBox}>
          <FlatList
            contentContainerStyle={Styles.Common.CheckoutBoxScrollView}
            data={addresses}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
        </View>}

        <Button
          style={Styles.Common.CheckoutButtonBottom}
          text={Languages.AddAddress}
          onPress={this._onPressAddAddress}
          isLoading={this.props.isFetching}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View>
    );

    return this._renderItem({ item: shippingAddress });
  }
}

const styles = StyleSheet.create({
  addressItem: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: "#d4dce1",
  },
  bottomView: {
    height: 44,
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
    width: Styles.window.width,
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.BuyNowButton,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
});
