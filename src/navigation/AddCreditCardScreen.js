/** @format */

import React, { PureComponent } from "react";
import { AddCreditCardContainer } from "@containers";
import { HeaderWithImage } from "@components";
import { Languages } from "@common";

export default class ShippingAddressFormScreen extends PureComponent {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  render() {
    return (
      <HeaderWithImage
        title={Languages.AddCreditCard}
        content={<AddCreditCardContainer {...this.props} />}
      />
    );
  }
}
