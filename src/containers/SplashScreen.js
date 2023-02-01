/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import { fetchProductByName } from "@redux/operations";

import { Spinkit, SearchBar } from "@components";
import { connect } from "react-redux";
 
const mapStateToProps = ({ user }) => {
  return {
    accessToken: user.accessToken,
    userInfo: user.userInfo,
  };
};

@connect(mapStateToProps, { fetchProductByName })
export default class SplashScreen extends PureComponent {
    componentDidMount(){
        if(this.props.userInfo&&this.props.userInfo.name){
            this.props.navigation.replace('HomeStack')
        }else{
            this.props.navigation.replace('Login')
        }
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
         
      </View>
    );
  }
}
