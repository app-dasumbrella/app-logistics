/** @format */

import { StyleSheet, I18nManager } from "react-native";
import { Constants, Color, Styles, Device } from "@common";

const { width, height } = Styles.window;

export default StyleSheet.create({
  section: {
    marginBottom: 50,
  },
  productInfo: {
    flex: 1,
  },
  imageSlider: {
    flex: 1,
    marginTop: 0,
  },
  imageProduct: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: "contain",
    width: Styles.window.width,
    height: 300,
  },
  imageButton: {
    width: 20,
    height: 20,
    tintColor: "#ccc",
    flex: 1,
  },
  naviBar: {
    height: 64,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  naviTitle: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    zIndex: 2,
    position: "absolute",
    top: 20,
    left: 10,
  },
  btnBackImage: {
    height: 30,
    width: 30,
  },
  productSizeContainer: {
    flexDirection: "row",
  },
  productSize: {
    marginRight: 10,
  },
  productTitle: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    color: Color.Text,
    //fontFamily: Constants.fontFamilyBold,
    marginBottom: 5,
    marginRight: 5,
  },
  productTypeName: {
    fontSize: 16,
    //fontFamily: Constants.fontFamily,
    lineHeight: 21,
    color: Color.TextDefault,
  },
  TName: {
    fontSize: 16,
    //fontFamily: Constants.fontFamilyBold,

    color: Color.blackTextSecondary,
  },
  productPrice: {
    fontSize: 19,
    color: Color.Text,
    letterSpacing: 0.5,
    marginRight: 20,
    marginTop: 5,
  },
  productPriceSale: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 5,
    marginTop: 4,
    //fontFamily: Constants.fontFamily,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Device.isIphoneX ? 59 : 50,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
  },
  buttonContainer: {
    flex: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBuy: {
    flex: 0.5,
    backgroundColor: Color.green,
  },
  outOfStock: {
    backgroundColor: Color.OutOfStockButton,
  },
  btnBuyText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: Constants.fontHeader,
  },
  description: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  productColorContainer: {
    position: "absolute",
    top: 50,
    left: I18nManager.isRTL ? width - 50 : 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: 50,
  },
  tabView: {
    minHeight: height / 2,
  },
  price_wrapper: {
    flexDirection: "row",
    marginBottom: 8,
  },
  textRating: {
    fontSize: Styles.FontSize.small,
  },

  attributeName: {
    color: "#aaa",
    //fontFamily: Constants.fontFamily,
    fontSize: 11,
  },
  textDescription: {
    fontSize: 16,
    //fontFamily: Constants.fontFamily,
    lineHeight: 20,
    color: Color.TextDefault,
  },
  addtoCartButton: {
    position: "absolute",
    right: 0,
    top: -70,
    width: 80,
    height: 80,
    zIndex: 99999,
  },
  iconAddCart: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});
