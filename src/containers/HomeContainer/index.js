/** @format */

import React, { Component } from "react";
import {
  FlatList,
  Dimensions,
  View,
  Text,
  Animated,
  Image,
} from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts,
  fetchFeatured,
} from "@redux/operations";
import { fetchCategories } from "@redux/operations";
import { HorizontalList, VerticalList } from "@components";
import { Constants, Styles, Config, HorizonLayouts } from "@common";
import VerticalItemBanner from "./VerticalItemBanner";
import { selectCategory } from "@redux/actions";
// import Carousel from "react-native-snap-carousel";
import settingData from "./../../data/json/site_1.0.json";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const mapStateToProps = ({ layout, products, app, category }) => ({
  layoutFetching: layout.isFetching,
  // default when vertical layout
  layoutMode: Constants.Layout.twoColumn,
  // vertical mode
  listData: layout.layout,
  list: products.list,
  hasNextPage: products.hasNextPage,
  productFetching: products.isFetching,
  cursor: products.cursor,
  shopify: app.shopify,
  featuredlist: layout.featuredlist,
  category: category,
});

const mapDispatchToProps = {
  fetchCategories,
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts,
  fetchFeatured,
  selectCategory,
};

@withTheme
@connect(mapStateToProps, mapDispatchToProps)
// @withNavigation
export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment().format("dddd, DD MMM YYYY"),
    };

    this.scrollAnimation = new Animated.Value(0);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 170],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  componentDidMount() {
    this.props.fetchFeatured();
    this.props.fetchCategories();
    //  this._fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    this._handleLoad(nextProps);
  }

  _handleLoad = (newProps) => {
    const { layoutMode } = this.props;
    if (newProps.layoutMode !== layoutMode) {
      // handle load when switch layout vertical list
      if (
        (newProps.list && newProps.list.length === 0) ||
        this._isHorizontal(newProps.layoutMode)
      ) {
        this._fetchAll(newProps.layoutMode);
      }
    }
  };

  _isHorizontal = () => {
    return Config.HomePage.Horizon;
  };

  _onPressSeeMore = (index, name) => {
    console.log(name);
    let list = this.props.category.list.filter((item) => item.title == name);
    this.props.selectCategory(list[0]);
    this.props.navigation.navigate("CategoryScreen");
    ///this.props.navigation.navigate("ListAllScreen", { index, name });
  };

  // _onPressItem = (item, isNews) => {
  //   if (isNews) {
  //     this.props.navigation.navigate("News", { item });
  //   } else {
  //     this.props.navigation.navigate("Detail", { item });
  //   }
  // };

  _renderLoading = () => {
    return this.props.isFetching;
  };

  _renderHeader = () => {
    const { shopify, theme } = this.props;
    return (
      <></>
      // <Carousel
      //   ref={(c) => {
      //     this._carousel = c;
      //   }}
      //   data={settingData.banner}
      //   renderItem={({ item }) => (
      //     <Image
      //       resizeMode={'stretch'}
      //       source={{ uri: item.src }}
      //       style={{ width: windowWidth, height: 250, }}
      //     />
      //   )}
      //   autoplay
      //   sliderWidth={windowWidth}
      //   itemWidth={windowWidth}
      // />
    );
  };

  _renderHorizontalList = ({ item, index }) => {
    return (
      <View style={styles.section}>
        <HorizontalList
          {...item}
          index={index}
          onPressSeeMore={this._onPressSeeMore}
        />
      </View>
    );
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  _renderRowItem = (item, index) => {
    const onPress = () => this._onPressItem(item);

    if (index === 0) {
      return (
        <VerticalItemBanner
          index={index}
          product={item}
          onPress={onPress}
          layout={Constants.Layout.miniBanner}
          horizontal={false}
        />
      );
    }

    return <></>;
  };

  /**
   * TODO: change to VerticalList component
   */
  _renderVerticalList = () => {
    const { list, layoutMode, productFetching, hasNextPage } = this.props;
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <VerticalList
        list={list}
        layout={layoutMode}
        isFetching={productFetching}
        onPressSeeMore={this._onPressSeeMore}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        hasNextPage={hasNextPage}
        renderHeader={this._renderHeader}
        onScroll={onScroll}
        renderRow={this._renderRowItem}
        numColumns={2}
      />
    );
  };

  render() {
    const { dataLayout, layoutFetching, listData, featuredlist } = this.props;
    Reactotron.log("listData", listData);
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );
    // render vertical layout
    if (this._isHorizontal()) {
      return (
        <View style={{ flex: 1, backgroundColor: "#FFF", }}>


          <AnimatedFlatList
            data={featuredlist}
            keyExtractor={(item, index) => `h_${index}`}
            renderItem={this._renderHorizontalList}
            ListHeaderComponent={this._renderHeader}
            scrollEventThrottle={1}
            refreshing={layoutFetching}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={layoutFetching}
            //     onRefresh={this._fetchAll}
            //   />
            // }
            {...{ onScroll }}
          />
        </View>
      );
    } else {
      return this._renderVerticalList();
    }
  }
}

const styles = {
  section: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10
  },
  header: {
    paddingVertical: 10,
    marginBottom: 10,
    marginLeft: Styles.spaceLayout,
  },
  headerDate: {
    fontSize: 19,
    marginBottom: 10,
    //fontFamily: Constants.fontFamily,
  },
  headerStore: (theme) => ({
    color: theme.primaryColor,
    fontSize: 30,
    marginBottom: 10,
    //fontFamily: Constants.fontFamily,
  }),
};
