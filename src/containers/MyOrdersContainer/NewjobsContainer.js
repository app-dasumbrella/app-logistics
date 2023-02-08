/** @format */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Animated,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { Constants, Languages, Color, Tools } from "@common";
import {
  storeNewJOb,
  acceptJobs
} from "@redux/operations";
import {
  Spinkit,
  CheckoutProductItem,
  Button,
  ModalWebView,
  Spinner
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
import styles2 from "./styles";
import { toast } from "@app/Omni";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';

import SectionListing from "./Sectionlist";
import { ScrollView } from "react-native-gesture-handler";
import NavBarLogo from "../../components/NavBar/Logo";
import { getCurrency, getFees, getNumOrder } from "../../ultils/Orderutils";
const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const mapStateToProps = (state, props) => {
  return {
    userInfo: state.user.userInfo,
    newJobs: state.app.newJobs,
    acceptLoading: state.app.acceptLoading,
    isFetching: state.app.isFetching
  };
};

const mapDispatchToProps = { storeNewJOb, acceptJobs };

@connect(mapStateToProps, mapDispatchToProps)
export default class NewjobsContainer extends Component {

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
    console.log("Xa")
    let { userInfo } = this.props || {}
    let { access_token, email } = userInfo || {}

    this.props.storeNewJOb({
      access_token,
      email
    }, (data) => {
      if (data?.logoutUser) {
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          }))
      }

    })
  }
  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    return (
      <SectionListing key={index} item={item} index={index} onPress={() => {
        this.props.navigation.navigate("OrderDetails", {
          item,
          from: 0,
        })
      }}
        onPress1={() => {
        }} />

    );
  };
  render() {
    const { list, isFetching, newJobs, acceptLoading } = this.props;
    let lengths = Object.keys(newJobs || {}).length;
    //console.log(newJobs, 'isFetching')
    return (
      <View style={styles.container}>
        <NavBarLogo title="New Jobs" />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.onRefresh}
            />
          }
        >
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
            <Text style={styles2.titleEmpty}>No new jobs
            </Text>
          </View>}
          {[...Array(lengths)].map((i, index) => {
            let level2 = newJobs[Object.keys(newJobs || {})[index]]
            let lengths2 = Object.keys(level2 || {}).length;
            return (
              <View style={{ paddingLeft: '5%', flex: 1 }}>
                {[...Array(lengths2)].map((i, index2) => {
                  let level3 = level2[Object.keys(level2 || {})]
                  let lengths3 = Object.keys(level3 || {}).length;

                  return (<View style={{
                    //flexDirection: "row",
                    //justifyContent: "space-between",
                    paddingRight: "5%",
                    paddingBottom: 7,
                  }}>
                    {[...Array(lengths3)].map((i, index3) => {
                      let level4 = level3[Object.keys(level3 || {})[index3]]
                      let lengths4 = Object.keys(level4 || {}).length
                      return (<>
                        {
                          [...Array(lengths4)].map((i, index4) => {
                            let records = level4[Object.keys(level4 || {})[index4]]
                            return this.renderItem({
                              item: {
                                records,
                                job_id: Object.keys(level4)[index4],
                                No_of_order: getNumOrder(records),
                                order_number: Object.keys(level3)[index3],
                                time: Object.keys(level2)[index2],
                                date: Object.keys(newJobs)[index],
                                fee: getFees(records),
                                currency: getCurrency(records)
                              },
                              index: Number(`${index}${index3}`)
                            })
                          }
                          )
                        }

                      </>)
                    })}

                  </View>
                  )
                })}

              </View>)
          }

          )}

        </ScrollView>
        {/* <Text style={styles.label}>{Object.keys(level4)[index3]}</Text>) */}

        {/* <FlatList
          // contentContainerStyle={styles.flatlist}
          data={orders.neworder}
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
    backgroundColor: "#FaFaFa",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: Color.textDefault,
    fontSize: 30,
    //fontFamily: Constants.fontFamilyBold,
  },
  label: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8,
  },
});
