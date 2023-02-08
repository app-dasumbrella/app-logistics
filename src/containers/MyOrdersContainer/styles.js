/** @format */

import { StyleSheet, Platform } from "react-native";
import { Color, Constants, Styles } from "@common";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "#B7C4CB",
  },
  titleEmpty: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
    opacity: 1,
    marginTop: 10,
    //fontFamily: Constants.fontFamilyBold,
    color: Color.primary

  },
  labelView: {

    flexDirection: "row",
    justifyContent: "space-between",
    // width: (90 * Styles.window.width) / 100,
    backgroundColor: "rgba(206, 215, 221, 1)",

    padding: 5,
    alignItems: "flex-start",
  },
  orderDetailLabel: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: Color.TabActive,
    marginTop: 10,
    marginBottom: 4,
    //fontFamily: Constants.fontFamilyBold,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingLeft: 6,
  },
  rowLabel: {
    fontSize: 16,
    color: Color.Text,
    //fontFamily: Constants.fontFamilyBold,
  },
  label: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8,
  },
  label2: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: moderateScale(10),
    color: Color.Text,
    textAlign: 'center'
  },
  label3: {
    //fontFamily: Constants.fontFamilyBold,
    fontSize: moderateScale(12),
    color: Color.Text,
    textAlign: 'center'
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    //fontFamily: Constants.fontFamily,
    color: Color.Text,
    width: 230,
    marginTop: 10,
    lineHeight: 25,
  },
  flatlist: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    //fontFamily: Constants.fontFamilyBold,
    color: Color.TextDefault,
    marginBottom: 5,
  },
  textDetail: {
    color: Color.Text,
    alignSelf: "center",
    marginBottom: 5,
  },
  lighttext: {
    //fontFamily: Constants.fontFamilyBold,
    color: Color.TextDefault,
    marginBottom: 5,

  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  checkStatusText: {
    color: Color.Text,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  backRightBtn: {},
  backRightBtnLeft: {
    right: 60,
    backgroundColor: Color.blue,
  },
  backRightBtnRight: {
    right: 0,
    backgroundColor: Color.red,
  },
  backBtnInner: {
    alignItems: 'center',
  },
  backBtnText: {
    color: Color.white,
    marginTop: 2,
  },
  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  rowBack: {
    height: 60
  },
  backBtn: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 10,
    width: moderateScale(150),
    marginLeft: 20,
    marginTop: 5,
    color: 'white',
    backgroundColor: Color.green,

  },
  buttons2: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 10,
    width: '28%',
    marginLeft: 20,
    marginTop: 5,
    color: 'white',
    backgroundColor: Color.green,
  },
  tabbutton: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    borderWidth: 0.5,
    borderColor: Color.ButtonBorder,
    width: '33%',
    marginTop: 5,
    color: 'white',
    backgroundColor: Color.green,
  },
  inActive: {
    backgroundColor: Color.tabbarTint
  },
  topborder: {

    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,

  },
  box: {
    backgroundColor: '#30B1C9',
    width: moderateScale(45),
    borderRadius: moderateScale(5),
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
