/** @format */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Animated,
  Text,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Constants, Languages, Color, Tools } from "@common";
import { GOOGLE_MAPS_APIKEY } from "@env";
import {
  storeAcceptedJOb
} from "@redux/operations";
import {
  Spinkit,
  CheckoutProductItem,
  Button,
  ModalWebView,
} from "@components";
import {
  getlayoutIndexSelector,
  getHasNextPageIndexSelector,
  getCursorIndexSelector,
  getIsFetchingIndexSelector,
  getCategoryIdIndexSelector,
} from "@redux/selectors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { VerticalList } from "@components";
import orders from "@data/json/category_1.0.json";
import moment from "moment";
import SectionListing from "./Sectionlist";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles2 from "./styles";

import * as _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import NavBarLogo from "../../components/NavBar/Logo";
import { getCurrency, getFees, getNumOrder } from "../../ultils/Orderutils";
import { moderateScale } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const mapStateToProps = (state, props) => {
  return {
    userInfo: state.user.userInfo,
    accpetedJobs: state.app.InprogressJobs,
    acceptLoading: state.app.acceptLoading,
    isFetching: state.app.isFetching


  };
};

const mapDispatchToProps = { storeAcceptedJOb };

@connect(mapStateToProps, mapDispatchToProps)
export default class InprogressjobsContainer extends Component {
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
        {
          latitude: 37.471707,
          longitude: -122.4053769,
        },
        {
          latitude: 37.271707,
          longitude: -122.4053769,
        },
      ],
    };

    this.mapView = null;
  }
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

    this.props.storeAcceptedJOb({
      access_token,
      email,
      "status": "in-progress"
    }, (data) => {

    })
  }
  onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };
  _renderAttribute = (label, context, style) => {
    return (
      <View style={styles2.row}>
        <Text style={styles2.rowLabel}>{label}</Text>
        <Text style={[styles2.rowLabel, style]}>{context}</Text>
      </View>
    );
  };
  renderItem2 = ({ item, index }) => {
    if (item == null) return <View />;

    return (
      <SectionListing key={index} item={item} index={index} onPress={() => {
        this.props.navigation.navigate("OrderDetails", {
          item,
          from: 2,
        })
      }}
        onPress1={() => {
        }} />

    );
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    return (
      <View>
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: "5%",
              paddingBottom: 7,
            }}
          >
            <Text style={styles.label}>{item.date}</Text>
            <Text style={styles.label}>
              {item.time}
            </Text>
          </View>

          {item.records.map((payload) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("OrderDetails", {
                  item: payload,
                })
              }
              style={{
                backgroundColor: "white",
                elevation: 2,
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: "5%",
                borderBottomColor: "rgba(206, 215, 221, 1)",
                borderBottomWidth: 0.5,
              }}
            >
              <Text style={[styles2.titleEmpty, { width: "20%", color: 'black' }]}>
                {payload.item_id}
              </Text>
              <View style={{ width: "80%", flexDirection: "column" }}>
                <Text style={[styles2.label, { marginBottom: 5 }]}>{payload?.address?.name}</Text>
                <Text style={[styles2.title, { marginLeft: 10 }]}>
                  {payload?.item_name}
                </Text>
                <Text style={[styles2.title, { marginLeft: 10 }]}>
                  {payload.customer_phone}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity
              style={styles2.buttons}
              onPress={() => {
                // //https://www.google.com/maps/dir/''/
                var url =
                  "https://www.google.com/maps/dir/?api=1&origin=Chicago, IL, USA&destination=Los Angeles, CA, USA&travelmode=driving&waypoints=Joplin, MO, USA";

                //var url = "https://www.google.com/maps/dir/?api=1&origin=Talsal Lake view, Waddem - Talaulim Rd, Agstipura, Goa 403401&destination=Talsal Lake view, Waddem - Talaulim Rd, Agstipura, Goa 403401&waypoints=adpai Post Office, 9XF9+685, Adpai, Goa|Chikolkar Pedh, mansher agapur durbhat, Ponda, Goa|Shri Simemharu Prasann, Durbhat, Goa 403401&travelmode=bike"
                Linking.canOpenURL(url)
                  .then((supported) => {
                    if (!supported) {
                      console.log("Can't handle url: " + url);
                      Linking.openURL(url);
                    } else {
                      return Linking.openURL(url);
                    }
                  })
                  .catch((err) => console.error("An error occurred", err));
              }}
            >
              <Text style={[styles2.rowLabel, { color: Color.main }]}>
                Start
              </Text>
            </TouchableOpacity> */}
        </View>

      </View>
    );
  };
  render() {
    const { list, isFetching, accpetedJobs: newJobs } = this.props;
    let lengths = Object.keys(newJobs || {}).length;

    return (
      <View style={styles.container}>
        <NavBarLogo title='Active Jobs' />
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={this.onRefresh}
          />
        }>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}></View>
          {lengths == 0 && <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 50,
            }}
          >
            <Text style={styles2.titleEmpty}>Please start a new delivery from assigned jobs</Text>
          </View>}


          {[...Array(lengths)].map((i, index) => {
            let level2 = newJobs[Object.keys(newJobs)[index]]
            let lengths2 = Object.keys(level2).length;
            return (
              <View style={{ paddingLeft: '5%' }}>

                {[...Array(lengths2)].map((i, index2) => {
                  let level3 = level2[Object.keys(level2)[index2]]
                  let lengths3 = Object.keys(level3).length;
                  return (<View style={{
                    //flexDirection: "row",
                    //justifyContent: "space-between",
                    paddingRight: "5%",
                    paddingBottom: 7,
                  }}>
                    {[...Array(lengths3)].map((i, index3) => {
                      let level4 = level3[Object.keys(level3)]
                      let lengths4 = Object.keys(level4).length
                      return (<View>
                        {[...Array(lengths4)].map((i, index4) => {
                          let level5 = level4[Object.keys(level4)[index4]]
                          let lengths5 = Object.keys(level5).length
                          return (<View>
                            {
                              [...Array(lengths5)].map((i, index5) => {
                                let records = level5[Object.keys(level5)[index5]]
                                return this.renderItem2({
                                  item: {
                                    job_id: Object.keys(level5)[index5],
                                    No_of_order: getNumOrder(records),
                                    order_number: Object.keys(level4)[index4],
                                    records,
                                    time: Object.keys(level3)[index3],
                                    date: Object.keys(level2)[index2],
                                    fee: getFees(records),
                                    currency: getCurrency(records)


                                  },
                                  index: Number(`${index3}${index4}`)
                                })
                              })}
                          </View>)
                        })
                        }
                      </View>)

                    })}

                  </View>
                  )
                })}

              </View>)
          }

          )}
        </ScrollView>
        {/* <FlatList
          // contentContainerStyle={styles.flatlist}
          data={arrays}
          keyExtractor={(item, index) => `post_${item.id}_${index}`}
          renderItem={this.renderItem}
          scrollEventThrottle={1}
          refreshing={isFetching}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => this.fetchData(true)}
            />
          }
          onEndReachedThreshold={50}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    marginBottom: 20,
  },
  label: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8,
  },
  headerTitle: {
    color: Color.textDefault,
    fontSize: 30,
    //fontFamily: Constants.fontFamilyBold,
  },
  colorback: {
    backgroundColor: Color.yellow,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    paddingHorizontal: "5%",
  },
});
