/** @format */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Constants, Languages, Color, Images } from "@common";
import { GOOGLE_MAPS_APIKEY } from "@env";
import {
  fetchProductLayoutNextPage,
  fetchArticlessLayoutNextPage,
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

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 15.3784805;
const LONGITUDE = 73.9718733;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class MapsContainer extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props || {}
    let { state } = navigation || {}
    let { params } = state || {}
    let { areas } = params || {}
    let coordinates = []
    areas && areas.map(i => {
      coordinates.push({ latitude: i.lat, longitude: i.long })

    })
    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: coordinates,
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    return <SectionListing item={item} index={index} />;
  };
  render() {
    const { list, isFetching } = this.props;
    const { coordinates } = this.state
    return (
      <View style={styles.container}>
        <View style={{ height: 50, backgroundColor: "white", justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Image
              style={{ width: 20, height: 20, paddingHorizontal: '5%', transform: [{ rotate: '180deg' }] }}
              resizeMode="contain"
              source={Images.IconNext}
            />
          </TouchableOpacity>
        </View>
        <MapView
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={{ width: "100%", height: "100%" }}
          ref={(c) => (this.mapView = c)}
        //  onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={
                this.state.coordinates.length >= 2
                  ? this.state.coordinates
                  : null
              }
              destination={this.state.coordinates[0]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="red"
              optimizeWaypoints={true}
              // onStart={(params) => {
              //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              // }}
              // onReady={result => {
              //   console.log(`Distance: ${result.distance} km`)
              //   console.log(`Duration: ${result.duration} min.`)

              //   this.mapView.fitToCoordinates(result.coordinates, {
              //     edgePadding: {
              //       right: (width / 20),
              //       bottom: (height / 20),
              //       left: (width / 20),
              //       top: (height / 20),
              //     }
              //   });
              // }}
              onError={(errorMessage) => {
                console.log("GOT AN ERROR", errorMessage);
              }}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: Color.textDefault,
    fontSize: 30,
    //fontFamily: Constants.fontFamilyBold,
  },
});
