/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Image, I18nManager } from "react-native";
import { connect } from "react-redux";
import { fetchCategories } from "@redux/operations";
import { selectCategory, logoutUser } from "@redux/actions";
import { Empty, Text, DrawerButton, DrawerButtonChild } from "@components";
import { toast } from "@app/Omni";
import { Icons, Config, Languages, Tools } from "@common";
import styles from "./styles";

const mapStateToProps = ({ user, category, netInfo, app }) => ({
  userInfo: user.userInfo,
  netInfo,
  category,
  selectedCategory: category.selectedCategory,
  language: app.language.lang,
});

/**
 * TODO: refactor
 */

@connect(
  mapStateToProps,
  { fetchCategories, selectCategory, logoutUser }
)
export default class DrawerMultiChild extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.object,
    fetchCategories: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    category: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // Config Menu
    this._updateListMenu(props.userInfo);
  }

  componentDidMount() {
    const { category } = this.props;
    if (category && category.list.length === 0) {
      //.props.fetchCategories();
    }
  }

  /**
   * Update when logged in
   */
  componentWillReceiveProps(nextProps) {
    const { userInfo } = nextProps;
    const { error } = nextProps.category;
    if (error) toast(error);

    this._updateListMenu(userInfo);
  }

  _updateListMenu = (userInfo) => {
    if (userInfo) {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuLogged,
      ];
    } else {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuUnlogged,
      ];
    }
  };

  /**
   * Render header of accordion menu
   */
  _renderHeader = (section, index, isActive) => {
    return (
      <DrawerButtonChild
        iconRight={isActive ? Icons.Ionicons.Remove : Icons.Ionicons.Add}
        text={section.title}
        uppercase
        key={index}
        {...section}
      />
    );
  };

  /**
   * Render content of accordion menu
   */
  _renderContent = (section) => {
    const { category, selectedCategory } = this.props;

    return (
      <View>
        {category.list.map((cate, index) => {
          return (
            <View key={index.toString()} style={{ marginLeft: 20 }}>
              <DrawerButton
                {...section}
                onPress={() => this._handlePress({ item: cate, section })}
                text={cate.title}
                textStyle={styles.textItem}
                isActive={
                  selectedCategory ? selectedCategory.id === cate.id : false
                }
              />
            </View>
          );
        })}
      </View>
    );
  };

  _renderRowCategories = () => {
    const { category } = this.props;
    const mainCategories = this._getCategories(category);

    if (category.error || !category || (category && category.list === 0)) {
      return <Empty />;
    }

    return (
      <View>
        {mainCategories && mainCategories.length ? (
          <View>
            <View style={styles.headerCategory}>
              <Text style={styles.textHeaderCategory}>
                {Languages.Category && Languages.Category.toUpperCase()}
              </Text>
            </View>
            {this._renderContent()}
          </View>
        ) : null}
      </View>
    );
  };

  _getCategories = (category) => {
    if (category && category.list.length) {
      return category.list;
    }

    return [];
  };

  _handlePress = ({ item }) => {
    const { goToScreen, selectCategory } = this.props;

    if (item.routeName) {
      if (item.text === "Logout") {
        this.props.logoutUser();
      }
      goToScreen(item.routeName, item.params, false);
    } else {
      const params = {
        ...item,
      };
      selectCategory(params);
      goToScreen("CategoryDetail", params, false);
    }
  };

  render() {
    const { userInfo } = this.props;
    const avatar = Tools.getAvatar(userInfo);
    const name = Tools.getName(userInfo);

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatar}
            style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
          />

          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{name}</Text>
            <Text style={styles.email}>{userInfo ? userInfo.email : ""}</Text>
          </View>
        </View>
        <ScrollView>
          {this.buttonList.map((item, index) => (
            <DrawerButton
              {...item}
              key={index.toString()}
              onPress={() => this._handlePress({ item })}
              icon={null}
              uppercase
            />
          ))}
          {this._renderRowCategories()}
        </ScrollView>
      </View>
    );
  }
}
