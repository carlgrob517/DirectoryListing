import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon, Image } from "@components";
import * as Utils from "@utils";
import { store } from "app/store";

/* Bottom Screen */
import Home from "@screens/Home";
import Category from "@screens/Category";
import Place from "@screens/Place";
import Whislist from "@screens/Whislist";
import Profile from "@screens/Profile";

/* Modal Screen only affect iOS */
import Filter from "@screens/Filter";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
import PreviewImage from "@screens/PreviewImage";
import SignUp from "@screens/SignUp";
import SignIn from "@screens/SignIn";

/* Stack Screen */
import Messenger from "@screens/Messenger";
import Review from "@screens/Review";
import Feedback from "@screens/Feedback";
import Messages from "@screens/Messages";
import Notification from "@screens/Notification";
import Walkthrough from "@screens/Walkthrough";
import ResetPassword from "@screens/ResetPassword";
import ChangePassword from "@screens/ChangePassword";
import ProfileEdit from "@screens/ProfileEdit";
import ChangeLanguage from "@screens/ChangeLanguage";
import PlaceDetail from "@screens/PlaceDetail";
import ContactUs from "@screens/ContactUs";
import AboutUs from "@screens/AboutUs";
import ChooseLocation from "@screens/ChooseLocation";
import { Images } from "../config/images";

// Transition for navigation by screen name
const handleCustomTransition = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1].route.routeName;
  switch (nextScene) {
    case "PreviewImage":
      Utils.enableExperimental();
      return Utils.zoomIn();
    default:
      return false;
  }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
  initialRouteName: "Home",
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: BaseColor.primaryColor,
    inactiveTintColor: BaseColor.grayColor,
    style: BaseStyle.tabBar,
    labelStyle: {
      fontSize: 12
    }
  }
};

// Tab bar navigation
const routeConfigs = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon color={tintColor} name="compass" size={20} solid />;
      }
    })
  },
  Category: {
    screen: Category,
    navigationOptions: ({ navigation }) => ({
      title: "Category",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon color={tintColor} name="clone" size={20} solid />;
      }
    })
  },
  Place: {
    screen: Place,
    navigationOptions: ({ navigation }) => ({
      title: "Mexican",
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          //  <Icon solid color={tintColor} name="map-marker-alt" size={20} solid />          
          <Image  source={Images.cat1} style={{ width: 25, height:25 }} tintColor={tintColor} />

        );
      }
    })
  },
  Whislist: {
    screen: Whislist,
    navigationOptions: ({ navigation }) => ({
      title: "Whislist",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon solid color={tintColor} name="bookmark" size={20} solid />;
      }
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: "Account",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon solid color={tintColor} name="user-circle" size={20} />;
      }
    })
  }
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
  routeConfigs,
  bottomTabNavigatorConfig
);

// Main Stack View App
const StackNavigator = createStackNavigator(
  {
    BottomTabNavigator: {
      screen: BottomTabNavigator
    },
    Walkthrough: {
      screen: Walkthrough
    },
    Profile: {
      screen: Profile
    },
    SignUp: {
      screen: SignUp
    },
    SignIn: {
      screen: SignIn
    },
    Review: {
      screen: Review
    },
    Feedback: {
      screen: Feedback
    },
    Messages: {
      screen: Messages
    },
    Notification: {
      screen: Notification
    },
    ResetPassword: {
      screen: ResetPassword
    },
    ChangePassword: {
      screen: ChangePassword
    },
    ProfileEdit: {
      screen: ProfileEdit
    },
    ChangeLanguage: {
      screen: ChangeLanguage
    },
    Messenger: {
      screen: Messenger
    },
    PlaceDetail: {
      screen: PlaceDetail
    },
    ContactUs: {
      screen: ContactUs
    },
    AboutUs: {
      screen: AboutUs
    }
  },
  {
    headerMode: "none",
    initialRouteName: "BottomTabNavigator"
  }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {
    Filter: {
      screen: Filter
    },
    ChooseLocation: {
      screen: ChooseLocation
    },
    Search: {
      screen: Search
    },
    SearchHistory: {
      screen: SearchHistory
    },
    PreviewImage: {
      screen: PreviewImage
    },
    StackNavigator: {
      screen: StackNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "StackNavigator",
    transitionConfig: screen => {
      return handleCustomTransition(screen);
    },
    transparentCard: true
  }
);

/* Permistion check authenticate*/
const defaultGetStateForAction = StackNavigator.router.getStateForAction;
const screenPermission = ["Profile"];

StackNavigator.router.getStateForAction = (action, state) => {
  const login = store.getState().auth.login.success;
  if (state && screenPermission.indexOf(action.routeName) > -1 && !login) {
    const routes = [...state.routes, { key: "signin", routeName: "SignIn" }];
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  return defaultGetStateForAction(action, state);
};

export default RootStack;
