import React from "react";
import { Text, View, TouchableOpacity, Animated, FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styles from "./styles";
import moment from "moment";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getTimeFormat } from '../../ultils/Timeutils'
import { Constants, Languages, Color, Tools } from "@common";
const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
let swipeableRow: Array<any> = [];
let pre;
const LeftActioms = ({ onPress, index }) => {
  // const scale= dragX.interpolate({
  //     inputRange:[0,100],
  //     outputRange:[0,1],
  //     extraploate:'clamp'
  // })
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(), close(index);
      }}
      style={{
        justifyContent: "center",

        alignSelf: "center",
        flex: 1,
        backgroundColor: "lightgreen",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          alignSelf: "center",
          paddingVertical: 10,
        }}
      >
        Accept
      </Text>
    </TouchableOpacity>
  );
};
const RightActioms = ({ onPress, index }) => {
  // const scale= dragX.interpolate({
  //     inputRange:[0,100],
  //     outputRange:[0,1],
  //     extraploate:'clamp'
  // })
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(), close(index);
      }}
      style={{
        justifyContent: "center",

        alignSelf: "center",
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          alignSelf: "center",
          paddingVertical: 10,
        }}
      >
        Cancel
      </Text>
    </TouchableOpacity>
  );
};
_renderAttribute = (label, context, style) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.lighttext}>{context}</Text>
    </View>
  );
};
closeRow = (index) => {
  if (pre && pre !== swipeableRow[index]) {
    pre.close();
  }
  pre = swipeableRow[index];
};

close = (index) => {
  if (swipeableRow[index]) swipeableRow[index].close();
};

const SectionListing = ({
  sectione,
  userProfile,
  title,
  myprofile,
  description,
  onPress,
  onPress1,
  onnavigate,
  move,
  drag,
  item,
  index,
  picResource,

}) => {
  let timeSpilt = item.time?.split("-")
  return (
    <View style={{ backgroundColor: "white", marginBottom: 0, elevation: 1 }}>
      {/* 
        <Swipeable
          ref={(ref) => (swipeableRow[index] = ref)}
          renderRightActions={() => (
            <RightActioms onPress={onPress} index={index} />
          )}
          renderLeftActions={() => (
            <LeftActioms onPress={onPress1} index={index} />
          )}
          onSwipeableOpen={() => {
            console.log("SSSS")
            closeRow(index)
          }}
        > */}
      <TouchableOpacity onPress={onPress}
        style={{
          backgroundColor: "white",
          elevation: 2,
          flexDirection: "row",
          paddingVertical: 20,
          paddingHorizontal: "5%",
          borderBottomColor: "rgba(206, 215, 221, 1)",
          borderBottomWidth: 0.5,
          justifyContent: 'center'
        }}
      >
        <View style={{ width: "15%", flexDirection: "column" }}>
          <Text style={[styles.label2]}>{'Orders'}</Text>

          <Text style={[styles.titleEmpty, { color: 'black' }]}>
            {item?.No_of_order}
          </Text>
        </View>

        <View style={{ width: "70%", flexDirection: "column", alignItems: 'center' }}>
          <Text style={[styles.label]}>{moment(item.date).format("DD MMM YYYY")}</Text>
          {item.time != "-" && <Text style={[styles.title, { marginLeft: 10 }]}>
            {getTimeFormat("12", timeSpilt?.[0])} - {getTimeFormat("12", timeSpilt?.[1])}
          </Text>}
          {item.time != "-" && <Text style={[styles.label2]}>
            {'Group'}-{item?.order_number}
          </Text>}
        </View>

        <View style={{ width: "25%", flexDirection: "column" }}>
          <Text style={[styles.label2,]}>{item?.currency}</Text>
          <Text style={[styles.titleEmpty, { color: 'black' }]}> {Number(item?.fee).toFixed(2)}</Text>

          {/* <Text style={[styles.titleEmpty, { color: 'black' }]}>
            {item?.order_number}
          </Text> */}
        </View>


      </TouchableOpacity>
      {/* </Swipeable> */}

    </View>
  );
};

export default SectionListing;
