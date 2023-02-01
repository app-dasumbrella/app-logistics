/** @format */

import React, { PureComponent } from "react";
import { UserAddressFormContainer } from "@containers";
import { HeaderWithImage } from "@components";
import { Languages } from "@common";

export default class UserAddressFormScreen extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const address = this.props.navigation.getParam("address");
    return (
      <HeaderWithImage
        title={address ? Languages.UpdateAddress : Languages.AddAddress}
        content={<UserAddressFormContainer {...this.props} />}
      />
    );
  }
}
