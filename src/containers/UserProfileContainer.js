/** @format */

import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
// import { Updates } from "expo";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import { toggleNotification, changeCurrency } from "@redux/actions";
import { logoutUserAndCleanCart, handleChangeStore } from "@redux/operations";
import {
  UserProfileHeader,
  UserProfileRowItem,
  ModalBox, Button,
  CurrencyPicker,
} from "@components";
import { NavigationActions, StackActions } from 'react-navigation';
import { Languages, Tools, Constants } from "@common";
import NavBarLogo from "../components/NavBar/Logo";
import { moderateScale } from "react-native-size-matters";
const mapStateToProps = ({ user, wishlist, app }) => ({
  wishlistTotal: wishlist.total,
  userInfo: user.userInfo,

  language: user.language,
  currency: app.currency,
  enableNotification: app.enableNotification,
  shopId: app.shopify.shopId,
});

/**
 * TODO: refactor
 */
@withTheme
@connect(
  mapStateToProps,
  {
    toggleNotification,
    changeCurrency,
    logoutUserAndCleanCart,
    handleChangeStore,
  }
)
export default class UserProfileContainer extends PureComponent {
  state = { dialogVisible: false, shopId: null, isChagingStore: false };
  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const {
      currency,
      wishlistTotal,
      userInfo,
      enableNotification,
    } = this.props;

    const listItem = [
      {
        label: `${Languages.WishList} (${wishlistTotal})`,
        routeName: "WishlistScreen",
      },
      userInfo && {
        label: `${Languages.Address} (${userInfo && userInfo.addresses && userInfo.addresses.length})`,
        routeName: "UserAddressScreen",
      },
      userInfo && {
        label: Languages.MyOrder,
        routeName: "MyOrders",
      },
      {
        label: Languages.Currency,
        value: currency.code,
        isActionSheet: false,
      },
      // only support mstore pro
      //   {
      //     label: Languages.Languages,
      //     routeName: 'SettingScreen',
      //     value: language.lang,
      //   },
      // {
      //   label: Languages.PushNotification,
      //   icon: () => (
      //     <Switch
      //       onValueChange={this._handleSwitch}
      //       value={enableNotification}
      //       tintColor={Color.blackDivide}
      //     />
      //   ),
      // },
      // {
      //   label: Languages.contactus,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.contactus,
      //   },
      // },
      // {
      //   label: Languages.Privacy,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.Privacy,
      //   },
      // },
      // {
      //   label: Languages.About,
      //   routeName: "CustomPage",
      //   params: {
      //     url: "http://inspireui.com",
      //   },
      // },
    ];

    return listItem;
  };

  _handleSwitch = (value) => {
    this.props.toggleNotification(value);
  };

  _handlePress = (item) => {
    const { navigation } = this.props;
    const { routeName, isActionSheet } = item;

    if (routeName && !isActionSheet) {
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };

  _handlePressLogin = () => {
    if (this.props.userInfo) {
      this.props.logoutUserAndCleanCart();
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        }))
    } else {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        }))
    }
  };

  _openAlert = () => {
    this.setState({ dialogVisible: true });
  };

  _handleOk = () => {
    if (this.props.shopId == this.state.shopId) {
      // this.setState({ dialogVisible: false });
      alert("Same secret code, please change another code");
    } else {
      this.setState({ isChagingStore: true });
      // this.props.handleChangeStore(this.state.shopId).then((data) => {
      //   if (data) {
      //     console.log(`You entered ${this.state.shopId}`, data);
      //     setTimeout(() => {
      //       Updates.reload();
      //     }, 500);
      //   } else {
      //     this.setState({ isChagingStore: false });
      //   }
      // });
    }
  };

  render() {
    const { userInfo, currency, changeCurrency, theme } = this.props;
    const name = Tools.getName(userInfo);
    const listItem = this._getListItem();

    return (
      <View style={styles.container}>
        <NavBarLogo title={'Profile'} />
        <ScrollView>
          {/* <UserProfileHeader
            onPress={this._handlePressLogin}
            user={{
              ...userInfo,
              name,
            }}
          /> */}
          <View style={styles.profileSection}>
            {userInfo && <Text style={styles.headerSection}>
              {Languages.AccountInformations.toUpperCase()}
            </Text>}
            {/* <UserProfileRowItem
                label={Languages.Name}
                onPress={this._handlePress}
                value={name}
              /> */}
            {userInfo && <UserProfileRowItem
              label={Languages.Email}
              value={userInfo.email}
            />}
            <Button
              onPress={this._handlePressLogin}
              style={{ marginVertical: moderateScale(20) }}
              textStyle={{ fontSize: moderateScale(14) }}
              type="text"
              transparent
              text={
                userInfo?.name === Languages.Guest
                  ? Languages.Login.toUpperCase()
                  : Languages.Logout.toUpperCase()
              } />

          </View>



        </ScrollView>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileSection: {
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});
