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
import { Tab } from "../navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import StockInHandContainer from "./StockInHandContainer";
import Commission from "./CommissionContainer";
import { createStackNavigator } from "react-navigation-stack";

import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'


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

export default class MyTabs extends PureComponent {
  state = { sel: 1 }
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
    this.focusListener = navigation.addListener("didFocus", () => {
      this.onRefresh()
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
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
  TabsScreen = () => {
    const MyTabs = createMaterialTopTabNavigator();
    return (
      <MyTabs.Navigator>
        <MyTabs.Screen name="MyTabScreen1"
          component={StockInHandContainer}
          options={{ title: 'Stock In Hand' }} />
        <MyTabs.Screen name="MyTabScreen2"
          component={Commission}
          options={{ title: 'Commission' }} />
      </MyTabs.Navigator>
    )
  }

  render() {
    const { isWishlist, style, commissionList, isFetching } = this.props;
    let lengths = Object.keys(commissionList || {}).length;
    let fee = 0;
    let { sel } = this.state

    return (
      <View style={styles.container}
        onTouchStart={e => this.touchY = e.nativeEvent.pageX}
        onTouchEnd={e => {
          console.log("O", this.touchY - e.nativeEvent.pageX, this.touchY)
          if (this.touchY - e.nativeEvent.pageX != 0) {
            if (this.touchY - e.nativeEvent.pageX > 10)
              this.setState({ sel: 2 })
            else if (this.touchY - e.nativeEvent.pageX < -10)
              this.setState({ sel: 1 })
          }

        }}
      >
        <NavBarLogo />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{
            width: '50%', justifyContent: 'center', alignItems: 'center', paddingVertical: moderateScale(15), borderBottomColor: 'rgb(0, 51, 102)', borderBottomWidth: sel == 1 ? 2 : 0,
            backgroundColor: sel == 1 ? '#e6f9ff' : '#FFF',

          }}
            onPress={() => this.setState({ sel: 1 })}
          >
            <Text style={{ fontSize: moderateScale(15), color: sel == 1 ? 'rgb(0, 51, 102)' : 'grey' }}>Stock In Hand</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: '50%', justifyContent: 'center', alignItems: 'center', paddingVertical: moderateScale(15)
            , borderBottomWidth: sel != 1 ? 2 : 0, borderBottomColor: 'rgb(0, 51, 102)',
            backgroundColor: sel != 1 ? '#e6f9ff' : '#fff',
          }}
            onPress={() => this.setState({ sel: 2 })}

          >
            <Text style={{ fontSize: moderateScale(15), color: sel != 1 ? 'rgb(0, 51, 102)' : 'grey' }}>Commission</Text>
          </TouchableOpacity>

        </View>
        {sel == 1 && <StockInHandContainer />}
        {sel != 1 && <Commission />}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FaFaFa",
    flex: 1

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
