/** @format */

import React, { PureComponent } from "react";
import { Animated, RefreshControl, FlatList, Text, View } from "react-native";
import moment from "moment";
import { withTheme } from "@callstack/react-theme-provider";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { getOrders } from "@redux/operations";
import {
  Spinkit,
  CheckoutProductItem,
  Button,
  ModalWebView,
} from "@components";
import { Constants, Languages, Color, Tools } from "@common";
import styles from "./styles";
import MyOrdersEmpty from "./Empty";
// import OrderItem from "./OrderItem";

const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const mapStateToProps = ({ user, carts }) => ({
  accessToken: user.accessToken,
  list: carts.order.list,
  isFetching: carts.order.isFetching,
  hasNextPage: carts.order.hasNextPage,
  cursor: carts.order.cursor,
});

@withTheme
@connect(
  mapStateToProps,
  { getOrders }
)
export default class MyOrdersContainer extends PureComponent {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this._readyTimer = null;

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this._readyTimer = setTimeout(() => {
      this.setState({ isReady: true });
    }, 500);
    this._fetchOrder();
  }

  componentWillUnmount() {
    clearTimeout(this._readyTimer);
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list && nextProps.list) {
      if (this.props.list.length !== nextProps.list.length) {
        this._fetchOrder();
      }
    }
  }

  _fetchOrder = () => {
    const { accessToken } = this.props;
    this.props.getOrders({ accessToken });
  };

  _renderAttribute = (label, context, style) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowLabel, style]}>{context}</Text>
      </View>
    );
  };

  _onPressProductItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  _checkStatus = (url) => {
    this._modal && this._modal.open(url);
  };

  _renderItemProduct = ({ item }) => {
    const onPress = () => this._onPressProductItem(item.variant.product);
    return (
      <CheckoutProductItem
        onPress={onPress}
        name={item.title}
        price={item.variant.price}
        quantity={item.quantity}
      />
    );
  };

  _renderItem = ({ item, index }) => {
    const onPressCheckStatus = () => this._checkStatus(item.statusUrl);
    return (
      <View style={{ margin: cardMargin, marginBottom: 0 }}>
        <View style={styles.labelView}>
          <Text style={styles.label}>#{item.orderNumber}</Text>
          <Button
            text={Languages.CheckOrderStatus}
            textStyle={styles.checkStatusText}
            type="text"
            transparent
            onPress={onPressCheckStatus}
          />
        </View>
        <View style={{ padding: 5, backgroundColor: "#FFF" }}>
          {this._renderAttribute(
            Languages.OrderDate,
            moment(item.processedAt).format("dddd, DD MMM YYYY")
          )}
          {/* {this._renderAttribute(
            Languages.OrderStatus,
            item.status.toUpperCase()
          )} */}
          {this._renderAttribute(
            Languages.OrderTotal,
            Tools.getPrice(item.totalPrice, item.currencyCode),
            {
              fontSize: 16,
              //fontFamily: Constants.fontFamilyBold,
              color: this.props.theme.primaryColor,
            }
          )}

          <Accordion
            activeSections={[0]}
            underlayColor="transparent"
            sections={[{}]}
            renderHeader={() => {
              return (
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={styles.orderDetailLabel}>
                    {Languages.OrderDetails}
                  </Text>
                </View>
              );
            }}
            renderContent={() => {
              return (
                <FlatList
                  data={item.lineItems}
                  enableEmptySections
                  keyExtractor={(item, index) => `${item.id} || ${index}`}
                  renderItem={this._renderItemProduct}
                />
              );
            }}
          />
        </View>
      </View>
    );
  };

  _hasOrder = () => {
    return this.props.list && this.props.list.length > 0;
  };

  _renderLoading = () => {
    return <Spinkit style={styles.loading} />;
  };

  render() {
    if (!this._hasOrder() && this.state.isReady && !this.props.isFetching) {
      return (
        <MyOrdersEmpty text={Languages.NoOrder} onReload={this._fetchOrder} />
      );
    }

    if (!this.state.isReady)
      return <View style={styles.container}>{this._renderLoading()}</View>;

    return (
      <View style={styles.container}>
        <AnimatedFlatList
          data={this.props.list}
          scrollEventThrottle={1}
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          contentContainerStyle={styles.flatlist}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this._hasOrder() ? this.props.isFetching : false}
              onRefresh={this._fetchOrder}
            />
          }
        />
        <ModalWebView ref={(modal) => (this._modal = modal)} />
      </View>
    );
  }
}
