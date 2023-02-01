/** @format */

import React from "react";
import { Animated, Image, View, Text } from "react-native";
import { isEmpty } from "lodash";
import { moderateScale, verticalScale } from "react-native-size-matters";
import NavBarMenu from "./Menu";
import NavBarCart from "./Cart";
import * as _ from "lodash";
import moment from "moment";
import NavBarClose from "./Close";
import { windowWidth } from "../../containers/HomeContainer";
let c = 0
const NavBarLogo = (props) => {
  let { close, navigation, manual, onPress, title } = props || {}

  return (
    <View >

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>

        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignSelf: 'center',
            marginVertical: 10,
            width: windowWidth * 0.3,
            marginLeft: 10
          }}
        >
          <Image
            resizeMode={"contain"}

            source={{ uri: 'https://assets-dev.originmattress.com.my/site/logo.png?t=1644250260' }}
            style={{ width: windowWidth * 0.3, height: verticalScale(30), alignSelf: 'center', marginVertical: 5 }}
          />
        </View>
        {!close && <View style={{ paddingRight: 10 }}>
          <Text style={{ color: 'rgb(0, 51, 102)', fontWeight: 'bold', fontSize: moderateScale(16) }}>{title}</Text>
        </View>}
        {/* <NavBarCart /> */}
        {close && <NavBarClose navigation={navigation} manual={manual} onPress={onPress} />}
      </View>
    </View>
  )
};
//};




export default NavBarLogo