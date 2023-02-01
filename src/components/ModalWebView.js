/** @format */

import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
// import Modal from "react-native-modalbox";
import { isFunction } from "lodash";
import { Languages, Constants } from "@common";
import { WebViewUrl } from "@components";

export default class ModalWebView extends PureComponent {
  state = { url: this.props.url };

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.setState({ url: nextProps.url });
    }
  }

  open = (url) => {
    if (!this.props.url) {
      this.setState({ url });
    }
    this._paymentModal.open();
  };

  close = () => {
    this._paymentModal.close();
  };

  _handleClose = () => {
    if (isFunction(this.props.onClosed)) {
      this.props.onClosed();
    } else {
      this.close();
    }
  };

  render() {
    const { url } = this.state;
    const userAgentAndroid =
      "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";

    return (<></>
      // <Modal
      //   ref={(modal) => (this._paymentModal = modal)}
      //   backdropPressToClose={false}
      //   backButtonClose
      //   backdropColor="#fff"
      //   swipeToClose={false}
      //   onClosed={this._handleClose}>
      //   <WebViewUrl
      //     style={styles.webView}
      //     uri={url}
      //     userAgent={userAgentAndroid}
      //     scalesPageToFit
      //   />
      //   <TouchableOpacity style={styles.iconZoom} onPress={this.close}>
      //     <Text style={styles.textClose}>{Languages.close}</Text>
      //   </TouchableOpacity>
      // </Modal>
    );
  }
}

const styles = StyleSheet.create({
  iconZoom: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 10,
    margin: 4,
    marginRight: 10,
    marginLeft: 10,
    zIndex: 9999,
    fontFamily: Constants.fontFamilyBold,
  },
  webView: {
    paddingTop: 50,
    zIndex: 9999,
  },
});
