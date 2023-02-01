/** @format */

import React, { PureComponent } from "react";

import DrawerMultiChild from "./DrawerMultiChild";
import DrawerDefault from "./DrawerDefault";

export default class DrawerContainer extends PureComponent {
  render() {
    if (this.props.isMultiChild) return <DrawerMultiChild {...this.props} />;

    return <DrawerDefault {...this.props} />;
  }
}
