/** @format */

import React, { PureComponent } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { updateCartItem } from "@redux/operations";
import { Tools, Color, Constants } from "@common";
import styles2 from "./MyOrdersContainer/styles";
import { loadImage } from "./../ultils/UploadImage";
import { Button } from "@components";

import SignatureScreen from "react-native-signature-canvas";
const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
const mapStateToProps = (state) => {
  return {
    checkoutId: state.carts.checkoutId,
    cartItems: state.carts.cartItems,
  };
};

@withNavigation
@connect(mapStateToProps, { updateCartItem })
export default class ProofDetailedContainer extends PureComponent {
  state = { docketImage: null };
  constructor(props) {
    super(props);
    this.callRef = React.createRef();
  }
  loadImageHandler = () => {
    loadImage()
      .then((docketImage) => {
        this.setState({ docketImage, isImageUpdated: true });
      })
      .catch((er) => {
        console.log(er);
      });
  };
  _handlePress = () => {
    this.props.navigation.navigate("Detail", { item: this.props.product });
  };
  loadImageHandler = () => {
    loadImage()
      .then((docketImage) => {
        this.setState({ docketImage, isImageUpdated: true });
      })
      .catch((er) => {
        console.log(er);
      });
  };
  render() {
    const { product, navigation } = this.props;
    let { state } = navigation || {};
    let { params } = state || {};
    let { item } = params || {};
    let { Showpannel } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={[styles2.titleEmpty, { color: Color.primary }]}>
            {item}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
            paddingHorizontal: "5%",
            alignItems: 'center'
          }}
        >
          <Button
            type={"border"}
            style={[{ padding: 10 }, item == "Proof of Collection" ? { width: "97%" } : { width: "45%" }]}
            text={`Upload ${item == "Proof of Collection" ? "Collection " : "Delivery"
              } picture`}
          />
          {item == "Proof of Delivery" && (
            <Button
              type={"border"}
              style={{ width: "45%", padding: 20 }}
              text="Take Signature"
            />
          )}
        </View>
        <View style={{ height: "75%" }}>
          {this.state.docketImage && (
            <View>
              <Image
                source={this.state.docketImage}
                style={{ width: "100%", height: 300 }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {Showpannel && (
          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "black",
                marginTop: 10,
                height: 300,
              }}
            >
              <SignatureScreen
                ref={this.callRef}
                onOK={this.handleOK}
                webStyle={style}
              />
            </View>
            <Button
              text={"Confirm"}
              type="text"
              textStyle={{ color: "#fff" }}
              onPress={async () => {
                await this.callRef.current.readSignature();
                setTimeout(
                  () =>
                    this.setState({ Showpannel: false, isImageUpdated: true }),
                  500
                );
              }}
              style={{ marginBottom: 5, padding: 10 }}
            />
            <Button
              text={"Clear"}
              type="text"
              textStyle={{ color: "#fff" }}
              onPress={() => this.callRef.current.clearSignature()}
              style={{ marginBottom: 5, padding: 10 }}
            />
            <Button
              text={"Cancel Signature"}
              type="text"
              textStyle={{ color: "#fff" }}
              onPress={() => this.setState({ Showpannel: false })}
              style={{ marginBottom: 5, padding: 10 }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#d4dce1",
  },
  content: {
    flexDirection: "row",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 15,
    //fontFamily: Constants.fontFamily,
    color: Color.TextDefault,
  },
  priceContainer: {
    // flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginTop: 10,
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flexWrap: "wrap",
  },
  price: {
    fontSize: 16,
    color: Color.Text,
    //fontFamily: Constants.fontFamilyBold,
    marginBottom: 10,
  },
  productVariant: {
    fontSize: 15,
    color: Color.blackTextSecondary,
    //fontFamily: Constants.fontFamily,
  },
  btnRemove: {
    justifyContent: "center",
    marginRight: 5,
  },
  addToCartIcon: {},
  wishlistIcon: {
    top: 40,
    right: -2,
  },
});
