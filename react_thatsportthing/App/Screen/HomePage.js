import React, { Component } from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import DrawerContent from "../Compoments/DrawerContent";
import HomeTabScreen from "./HomeTabScreen";
import ProfileScreen from "./ProfileScreen";
import MyCrewScreen from "./MyCrewScreen";

const HomePageNavigator = createStackNavigator({
  HomeTabScreen: {
    screen: HomeTabScreen
  }
});
const ProfileScreenNavigator = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen
  }
});
const MyCrewScreenNavigator = createStackNavigator({
  MyCrewScreen: {
    screen: MyCrewScreen
  }
});
const HomePage = createDrawerNavigator(
  {
    HomeTabScreen: { screen: HomePageNavigator },
    ProfileScreen: { screen: ProfileScreenNavigator },
    MyCrewScreen: {
      screen: MyCrewScreenNavigator,
      navigationOptions: {
        header: null
      }
    }
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
);

export default HomePage;
