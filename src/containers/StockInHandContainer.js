/** @format */

import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  RefreshControl,

  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  storeCommission
} from "@redux/operations";
import { connect } from "react-redux";
import styles2 from "./MyOrdersContainer/styles";
import { Constants, Languages, Color, Tools, Images } from "@common";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import NavBarLogo from "../components/NavBar/Logo";

const mapStateToProps = (state, props) => {
  return {
    userInfo: state.user.userInfo,
    commissionList: state.app.commissionList,
    acceptLoading: state.app.acceptLoading,
    isFetching: state.app.commissionLoading


  };
};

const mapDispatchToProps = { storeCommission };
@connect(mapStateToProps, mapDispatchToProps)

export default class StockInHandContainer extends PureComponent {
  showpAlert = (name) => {
    Alert.alert(
      "Alert",
      `Are you sure you want to confirm ${name} stock?`,
      [
        { text: "Yes", onPress: () => { } },
        { text: "No", onPress: () => { } },
      ],
      { cancelable: false }
    );
  };
  componentDidMount() {
    const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", () => {
    //   this.onRefresh()
    // });
  }

  componentWillUnmount() {
    // Remove the event listener
    //  this.focusListener.remove();
  }

  onRefresh = () => {
    let { userInfo } = this.props || {}
    let { access_token, email } = userInfo || {}

    this.props.storeCommission({
      access_token,
      email
    }, (data) => {

    })
  }
  renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "white", elevation: 2,
          flexDirection: "row",
          paddingVertical: 20,
          paddingHorizontal: "5%",
          borderBottomColor: "rgba(206, 215, 221, 1)",
          borderBottomWidth: 0.5,
          marginBottom: 8,
          marginHorizontal: '5%'
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={[styles.title]}>{item.name}</Text>
          <Text style={[styles.titleEmpty, { color: "black" }]}>
            {item.quantity}
          </Text>
        </View>

        {/* <TouchableOpacity
          disabled={item.confirmed}
          onPress={() => this.showpAlert(item.name)}
        >

          <Image source={item.confirmed ? Images.icons.check : Images.icons.cross}
            style={{ width: moderateScale(20), height: moderateScale(20) }}
            resizeMode={'contain'}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  render() {
    const { isWishlist, style, commissionList, isFetching } = this.props;
    let lengths = Object.keys(commissionList || {}).length;
    let fee = 0;

    return (
      <View style={styles.container}>
        {/* <NavBarLogo /> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
          }}
        >

          {/* <TouchableOpacity style={{
            position: 'absolute', right: '8%', top: 10
          }}>
            <Icon
              style={[styles.icon]}
              color={Color.primary}
              size={22}
              name={"plus"}
            />
          </TouchableOpacity> */}
        </View>
        <View  >
          <FlatList
            //contentContainerStyle={{ height: '40%' }}
            data={[
              {
                id: 1,
                name: "Origin Mattress single",
                quantity: 20,
                confirmed: true,
              },
              {
                id: 1,
                name: "Origin Mattress king",
                quantity: 96,
                confirmed: true,
              },
              {
                id: 1,
                name: "Origin Mattress queen",
                quantity: 5,
                confirmed: false,
              },
              {
                id: 1,
                name: "Origin Mattress PO",
                quantity: 40,
                confirmed: false,
              }, {
                id: 1,
                name: "Origin Mattress queen",
                quantity: 69,
                confirmed: false,
              },
            ]}
            keyExtractor={(item, index) => `stock_${item.id}_${index}`}
            renderItem={this.renderItem}
            scrollEventThrottle={1}
            //refreshing={ }
            // refreshControl={
            //   <RefreshControl
            //     refreshing={ }
            //     onRefresh={() => this.fetchData(true)}
            //   />
            // }
            showsVerticalScrollIndicator
            onEndReachedThreshold={50}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FaFaFa",

  },
  imageButton: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    position: "absolute",
    right: 10,
    top: 5,
    zIndex: 9999,
  },
  title: {
    color: "black",
    fontSize: 14,
  },
  label2: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: moderateScale(14),
    color: Color.Text,
    textAlign: 'center'
  },
});
