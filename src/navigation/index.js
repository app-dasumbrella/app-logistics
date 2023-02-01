/** @format */

import React from "react";
import { Images } from "@common";
import { TabBar } from "@components";
import { View, I18nManager } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  TabBarIconContainer,
  NewjobsContainer,
  ConfirmedjobsContainer,
  MapsContainer,
  SplashScreen,
  ProofDetailedContainer,
  InProgressJob
} from "@containers";
import HomeScreen from "./HomeScreen";
import OrderDetailContainer from "./OrderDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import DetailScreen from "./DetailScreen";
import CartScreen from "./CartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import StockInHandContainer from "./StockInHandScreen";
import Commission from "./../containers/CommissionContainer";

import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
import UserProfileScreen from "./UserProfileScreen";
import UserAddressScreen from "./UserAddressScreen";
import UserAddressFormScreen from "./UserAddressFormScreen";
import AddCreditCardScreen from "./AddCreditCardScreen";

import TransitionConfig from "./TransitionConfig";
import MyTabs from "../containers/MyTabs";

const Tab = createMaterialTopTabNavigator(
  {
    "Stock In Hand": { screen: StockInHandContainer },
    "Commission": { screen: Commission },
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'rgb(0, 51, 102)',
      inactiveTintColor: "black",
      labelStyle: {
        textAlign: "center",
      },
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        borderBottomColor: 'rgb(0, 51, 102)',
        borderBottomWidth: 2,
      },
    },
  }
);

const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: { screen: CategoriesScreen },
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryDetailStack = createStackNavigator(
  {
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

// const WishlistStack = createStackNavigator(
//   {
//     WishlistScreen: { screen: WishlistScreen },
//   },
//   {
//     navigationOptions: {
//       gestureDirection: I18nManager.isRTL ? "inverted" : "default",
//     },
//   }
// );

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: NewjobsContainer },
    ListAllScreen: { screen: ListAllScreen },


  },
  {
    headerMode: "none",
    navigationOptions: {
      headerShown: false,
      headerVisible: false,
      header: null,
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const InProgeressjobsScreenStack = createStackNavigator(
  {
    InProgressJob: { screen: InProgressJob },

    Maps: { screen: MapsContainer, headerShown: true },
  },
  {
    headerMode: "none",

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);
const ConfirmedjobsScreenStack = createStackNavigator(
  {
    Confirmedjobs: { screen: ConfirmedjobsContainer },

    Maps: { screen: MapsContainer, headerShown: true },
  },
  {
    headerMode: "none",

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);



const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    WishlistScreen: { screen: StockInHandContainer },
    UserAddressScreen: { screen: UserAddressScreen },
    UserAddressFormScreen: { screen: UserAddressFormScreen },
  },
  {
    headerMode: "none",

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: { screen: MyOrdersScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Default: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer icon={Images.IconHome} icon1={Images.IconHome2} {...props} />
        ),
      },
    },

    ConfirmedjobsContainer: {
      screen: ConfirmedjobsScreenStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            orderIcon
            icon={Images.IconOrder}
            icon1={Images.IconOrder2}

            {...props}
          />
        ),
      },
    },
    InProgressjobsContainer: {
      screen: InProgeressjobsScreenStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            orderIcon
            icon={Images.IconOrderP2}
            icon1={Images.IconOrderP}

            {...props}
          />
        ),
      },
    },


    UserProfileScreen: {
      screen: MyTabs,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            wishlistIcon
            icon={Images.cal1}
            icon1={Images.cal2}
            css={{ width: 18, height: 18 }}

            {...props}
          />
        ),
      },
    },
    ProfileContainer: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            orderIcon
            css={{ width: 18, height: 18 }}
            icon={Images.profile1}
            icon1={Images.profile2}
            {...props}
          />
        ),
      },
    },

  },
  {
    // initialRouteName: "CartScreen",
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
    },
  }
);

TabNavigator.navigationOptions = () => {
  return {
    // fix header show when open drawer
    header: <View />,
    headerStyle: {
      backgroundColor: "transparent",
      height: 0,
      paddingTop: 0,
      borderBottomColor: "transparent",
      borderBottomWidth: 0,
    },
  };
};

const AppNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    Login: LoginScreen,
    HomeStack: TabNavigator,
    ProofDetail: ProofDetailedContainer,

    Detail: DetailScreen,
    OrderDetails: OrderDetailContainer,

    Register: RegisterScreen,
    CustomPage: CustomPageScreen,
  },
  {
    mode: "modal",
    headerMode: 'none',
    transitionConfig: () => TransitionConfig,
  }
);

export default createAppContainer(AppNavigator);

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

CategoryStack.router.getStateForAction = navigateOnce(
  CategoryStack.router.getStateForAction
);
CategoryDetailStack.router.getStateForAction = navigateOnce(
  CategoryDetailStack.router.getStateForAction
);
// WishlistStack.router.getStateForAction = navigateOnce(
//   WishlistStack.router.getStateForAction
// );
HomeStack.router.getStateForAction = navigateOnce(
  HomeStack.router.getStateForAction
);
SearchStack.router.getStateForAction = navigateOnce(
  SearchStack.router.getStateForAction
);
ConfirmedjobsScreenStack.router.getStateForAction = navigateOnce(
  ConfirmedjobsScreenStack.router.getStateForAction
);
