/** @format */

import React, { PureComponent } from "react";
import { UserAddressContainer } from "@containers";
import { HeaderWithImage } from "@components";
import { Languages } from "@common";

export default class UserAddressScreen extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <HeaderWithImage
        title={Languages.ShippingAddress}
        content={<UserAddressContainer {...this.props} />}
      />
    );
  }
}
