/** @format */

import React, { Component } from "react";
import {
  View,
  Animated,
  FlatList,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { findIndex } from "lodash";
import { connect } from "react-redux";
import { addToCart } from "@redux/operations";
import {
  Styles,
  Tools,
  Config,
  Constants,
  Languages,
  Images,

  Color,
} from "@common";
import { ModalPhotos, AdMob, LayoutItem, ProductTitle, Rating } from "@components";
import { ProductRelatedContainer } from "@containers";
import { toast } from "@app/Omni";
//import HTML from "react-native-render-html";
import Title from "./Title";
import AnotherAttributes from "./AnotherAttributes";
import ColorAttributes from "./ColorAttributes";
import BottomTabBar from "./BottomTabBar";
import styles from "./styles";

const PRODUCT_IMAGE_HEIGHT = 300;

const mapStateToProps = (state, props) => {
  const item = props.navigation.getParam("item");
  return {
    product: item,
    checkoutId: state.carts.checkoutId,
    cartItems: state.carts.cartItems,
    total: state.carts.total,
    isFetching: state.carts.isFetching,
  };
};

@connect(mapStateToProps, { addToCart })
export default class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;

    this.state = {
      active: 1,
      scrollY: new Animated.Value(0),
      selectedOptions: {},
      selectedVariant: {},
    };
  }

  componentWillMount() {
    this._updateVariantAndOptions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // update selecting another product in related product
    if (this.props.product !== nextProps.product) {
      this._updateVariantAndOptions(nextProps);
      this._scrollview &&
        this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  _updateVariantAndOptions = (props) => {
    if (props.product) {
      const defaultVarient =
        props.product && props.product.variants && props.product.variants[0];
      let selectedOptions = {};
      props.product &&
        props.product.options.forEach((selector) => {
          selectedOptions = {
            ...selectedOptions,
            [selector.name.toUpperCase()]: selector.values[0].value,
          };
        });
      this.setState({ selectedVariant: defaultVarient, selectedOptions });
    }
  };

  _getVariantImage = (variant) => {
    if (!variant) return this.state.selectedVariantImage;
    return Tools.getProductImage(variant.image.src, Styles.width);
  };

  _getPhotoIndex = (selectedVariant) => {
    const selectedVariantImage = 1;
    const photoIndex = findIndex(this.props.product.gallery, (o) => {
      return o.src === selectedVariantImage;
    });

    return photoIndex < 0 ? 0 : photoIndex;
  };

  _openModalPhoto = (index) => {
    this._modalPhoto.openModal(index);
  };

  /**
   * TODO: change color update selectedOptions
   */
  _onSelectOption = (attrType, value) => {
    const { product } = this.props;
    const selectedOptions = this.state.selectedOptions;
    selectedOptions[attrType] = value;
    const selectedVariant = Tools.getVariant(product.variants, selectedOptions);

    // scroll photos to index
    const photoIndex = this._getPhotoIndex(selectedVariant);
    this._photos.scrollToIndex({ index: photoIndex });

    this.setState({
      selectedVariant,
      selectedOptions,
    });
  };

  /**
   * add to cart
   */
  _addToCart = (navigateToCart = false) => {
    const { addToCart, cartItems, total } = this.props;
    const { selectedVariant } = this.state;
    const { product } = this.props;

    // if (total < Constants.LimitAddToCart) {
    if (selectedVariant) {
      addToCart({ cartItems, product, selectedVariant }, (data) => {
        console.log(data, "SSSOOOOO");
        if (data && !data.error) {
          if (navigateToCart) {
            this.props.navigation.navigate("CartScreen");
          }
        }
      });
    } else {
      toast("Variant not available");
    }
    // } else {
    //  toast(Languages.ProductLimitWaring);
    //s}
  };

  _renderTitle = () => {
    return (
      <View style={Styles.Common.SpacingLayout}>
        <Title
          product={this.props.product}
          selectedVariant={this.state.selectedVariant}
        />
      </View>
    );
  };

  _renderAttributes = () => {
    const { product } = this.props;

    return (
      <AnotherAttributes
        onSelect={this._onSelectOption}
        options={product.options}
        variants={product.variants}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  _renderProductColor = () => {
    const { product } = this.props;
    const variantColors = Tools.getAttribute(product, "color");

    return (
      <ColorAttributes
        onSelect={this._onSelectOption}
        scrollY={this.state.scrollY}
        options={variantColors ? variantColors.options : null}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  _renderPhoto = ({ item, index }) => {
    const openModalPhoto = () => {
      this._openModalPhoto(index);
    };
    return (
      <LayoutItem
        index={index}
        imageURI={item.url}
        onPress={openModalPhoto}
        layout={Constants.Layout.miniBanner}
        //   product={item}
        mode={"stretch"}
      />
    );
  };

  _renderImages = () => {
    const { product } = this.props;
    return (
      <FlatList
        contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
        ref={(comp) => (this._photos = comp)}
        data={product.gallery}
        renderItem={this._renderPhoto}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    );
  };

  _renderDescription = () => {
    const contentWidth = Dimensions.get("window").width;

    return (
      <View style={Styles.Common.SpacingLayout}>
        <ScrollView style={{ flex: 1 }}>
          {/* <HTML
            source={{ html: this.props.product.long_desc }}
            contentWidth={contentWidth}
          /> */}
        </ScrollView>
        <Text style={styles.textDescription}></Text>
      </View>
    );
  };

  _renderBottomTabBar = () => {
    return (
      <BottomTabBar
        variant={this.state.selectedVariant}
        product={this.props.product}
        addToCart={this._addToCart}
      />
    );
  };

  _renderRelatedProduct = () => {
    return <ProductRelatedContainer product={this.props.product} />;
  };

  _renderContentPhoto = () => {
    return (
      <View>
        <TouchableOpacity
          disabled={this.props.isFetching}
          style={styles.addtoCartButton}
          onPress={() => this._addToCart()}
        >
          <Image style={styles.iconAddCart} source={Images.IconAddCart} />
        </TouchableOpacity>
        {this._renderTitle()}
      </View>
    );
  };
  _renderReview = () => {
    const { product } = this.props;
    return (
      <FlatList
        contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
        data={product.reviews}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              borderWidth: 0.5,
              padding: 15,
              borderRadius: 5,
              width: "95%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={item.profile}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: Color.gray,
                }}
              />
              <Text style={[styles.TName, { marginLeft: 15 }]}>
                {item.desc}
              </Text>
            </View>
            <Rating style={{ alignSelf: 'flex-start' }} rating={Number(item.rating)} size={22} />
            <Text style={[styles.textDescription, { marginVertical: 7 }]}>{item.desc}</Text>

          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  render() {
    const { product } = this.props;
    console.log(this.state.selectedOptions, "this.state.selectedOptions");
    console.log(this.state.selectedVariant, "selectedVariant");
    const { active } = this.state;
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <ScrollView ref={(comp) => (this._scrollview = comp)}>
          <View style={styles.imageContainer}>{this._renderImages()}</View>
          <View style={styles.content}>
            {this._renderTitle()}
            <View style={styles.section}>{this._renderAttributes()}</View>
            <View style={{ flexDirection: "row", paddingHorizontal: "5%" }}>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderBottomWidth: active == 1 ? 1 : 0,
                }}
                onPress={() => this.setState({ active: 1 })}
              >
                <ProductTitle name={Languages.AdditionalInformation} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderBottomWidth: active == 2 ? 1 : 0,
                }}
                onPress={() => this.setState({ active: 2 })}
              >
                <ProductTitle name={"Reviews"} />
              </TouchableOpacity>
            </View>
          </View>
          {active == 1 && (
            <View style={styles.section}>{this._renderDescription()}</View>
          )}
          {active == 2 && (
            <View style={styles.section}>{this._renderReview()}</View>
          )}

          <View style={styles.section}>{this._renderRelatedProduct()}</View>
          {/* {this._renderProductColor()} */}
        </ScrollView>

        {this._renderBottomTabBar()}

        <ModalPhotos
          ref={(comp) => (this._modalPhoto = comp)}
          photos={product.gallery}
          renderContent={this._renderContentPhoto}
          isFetching={this.props.isFetching}
        />
      </View>
    );
  }
}
