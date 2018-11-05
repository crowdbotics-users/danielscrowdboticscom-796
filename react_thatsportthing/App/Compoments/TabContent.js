import React, { Component } from "react";
import {
  TabNavigator,
  createStackNavigator,
  createTabNavigator,
  createMaterialTopTabNavigator,
  Dimensions
} from "react-navigation";
import Color from "../Resource/Colors";

import StreamScreen from "../Screen/StreamScreen";
import TabBarCompoment from "./TabBarCompoment";
import FriendsPostScreen from "../Screen/FriendsPostScreen";
import SearchScreen from "../Screen/SearchScreen";
import PostScreen from "../Screen/PostScreen";
import PictureScreen from "../Screen/PictureScreen";
import FriendsScreen from "../Screen/FriendsScreen";

const StreamNavigator = createStackNavigator({
  Stream: {
    screen: StreamScreen
  }
});
const FriendsPostNavigator = createStackNavigator({
  "Friend's Post": {
    screen: FriendsPostScreen
  }
});
const SearchNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen
  }
});
const PostNavigator = createStackNavigator({
  Posts: {
    screen: PostScreen
  }
});
const PicturesNavigator = createStackNavigator({
  Pictures: {
    screen: PictureScreen
  }
});
const FriendsNavigator = createStackNavigator({
  Friends: {
    screen: FriendsScreen
  }
});
export const TabContent = createMaterialTopTabNavigator(
  {
    Stream: {
      screen: StreamNavigator
    },
    "Friend's Post": {
      screen: FriendsPostNavigator
    },
    Search: {
      screen: SearchNavigator
    },
    Posts: {
      screen: PostNavigator
    },
    Pictures: {
      screen: PicturesNavigator
    },
    Friends: {
      screen: FriendsNavigator
    }
  },
  {
    tabBarPosition: "top",
    animationEnabled: true,
    swipeEnabled: true,
    // tabBarComponent: TabBarCompoment,
    tabBarOptions: {
      tabStyle: {
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        backgroundColor: Color.white
      },
      scrollEnabled: true,
      activeTintColor: Color.bgHeader,
      inactiveTintColor: Color.bgHeader,
      activeBackgroundColor: Color.bgHeader,
      inactiveBackgroundColor: Color.bgHeader,
      labelStyle: {
        fontSize: 14,
        fontFamily: "OpenSans-SemiBold"
      },
      style: {
        backgroundColor: "#4A4A4A"
      },
      indicatorStyle: {
        borderBottomColor: Color.transparent,
        borderBottomWidth: 0,
        marginBottom: 0
      }
    }
  }
);
