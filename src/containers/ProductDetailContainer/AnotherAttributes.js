/** @format */

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { ProductSize, ProductTitle } from "@components";
import { Constants, Tools, Styles } from "@common";
import { isObject } from "lodash";
import styles from "./styles";
import { warn } from "@app/Omni";

/**
 * render another attributes without color
 */
const COLOR = "COLOR";
export default class ProductDetailAnotherAttributes extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.selectedOptions !== this.props.selectedOptions;
  // }

  _onSelectAttribute = (name, value) => {
    const { onSelect } = this.props;
    onSelect(name, value);
  };

  _renderHeaderOption = (name) => {
    return (
      <View style={Styles.Common.SpacingLayout}>
        <ProductTitle name={name} />
      </View>
    );
  };

  render() {
    const { options, selectedOptions, variants } = this.props;
    if (!options || (options && options.length === 0)) {
      return null;
    }

    return (
      <View>
        {options.map((attribute, index) => {
          const attrName = attribute.name.toUpperCase();
          //if (attrName === COLOR) return null;
          return (
            <View key={index.toString()} style={{marginTop:10}}>
              {this._renderHeaderOption(attribute.name)}
              <View
                style={[
                  styles.productSizeContainer,
                  Constants.RTL && { flexDirection: "row-reverse" },
                ]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {attribute.values.map((o, idx) => {
                    const selectedValue = isObject(o) ? o.value : o;
                    // // check existed size in color have varient if null return
                    // const selectedVariant = Tools.getVariant(variants, {
                    //   [COLOR]: selectedOptions[COLOR],
                    //   [attrName]: selectedValue,
                    // });
                    // if (!selectedVariant) return null;

                    const onSelectAttribute = () =>
                      this._onSelectAttribute(attrName, selectedValue);
                    return (
                      <ProductSize
                        key={idx.toString()}
                        text={selectedValue}
                        style={[
                          styles.productSize,
                          idx === 0 && Styles.Common.SpacingLayout,
                        ]}
                        onPress={onSelectAttribute}
                        selected={selectedOptions[attrName] === selectedValue}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
