import React, { Component } from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import DrawerContent from "../Compoments/DrawerContent";

import StreamScreen from "./StreamScreen";
import { TabContent } from "../Compoments/TabContent";
import HomeTabScreen from "./HomeTabScreen";
const StreamScreenNavigator = createStackNavigator({
  StreamScreen: { screen: StreamScreen }
});

const HomePageNavigator = createStackNavigator({
  HomeTabScreen: {
    screen: HomeTabScreen
  }
});

export default (HomePage = createDrawerNavigator(
  {
    StreamScreen: { screen: StreamScreenNavigator },
    TabContent: { screen: TabContent },
    HomeTabScreen: { screen: HomePageNavigator }
  },
  {
    initialRouteName: "HomeTabScreen",
    contentComponent: DrawerContent,
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerBackgroundColor: Color.navBg,
    contentOptions: {
      activeTintColor: Color.white,
      labelStyle: {
        color: Color.white
      }
    }
  }
));
