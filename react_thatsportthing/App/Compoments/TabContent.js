import React, { Component } from "react";
import { TabNavigator, createStackNavigator,createTabNavigator,createMaterialTopTabNavigator,Dimensions } from "react-navigation";
import Color from "../Resource/Colors";

import StreamScreen from "../Screen/StreamScreen";
import TabBarCompoment from "./TabBarCompoment";

const StreamNavigator = createStackNavigator({
  Stream: {
    screen: StreamScreen
  }
});
export const TabContent = createMaterialTopTabNavigator(
  {
    Stream: {
      screen: StreamNavigator
    },
    "Friend's Post": {
      screen: StreamNavigator
    },
    Search: {
      screen: StreamNavigator
    },
    Posts: {
      screen: StreamNavigator
    },
    Pictures: {
      screen: StreamNavigator
    },
    Friends: {
      screen: StreamNavigator
    }
  },
  {
    tabBarPosition: "top",
    animationEnabled: true,
    swipeEnabled: true,
    // tabBarComponent: TabBarCompoment,
    tabBarOptions: {
      tabStyle: {
          marginLeft:5,
          marginRight:5,
          borderRadius:10,
          backgroundColor:Color.white
          
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
    /* tabBarOptions: {
            upperCaseLabel: true,
            indicatorStyle: {
                borderBottomColor: Color.transparent,
                borderBottomWidth: 0,
                marginBottom: 0
            },
            scrollEnabled: true,
            activeTintColor: Color.bgHeader,
            inactiveTintColor: Color.black,
            pressColor: Color.bgHeader,
            style: {

                backgroundColor: '#4A4A4A',
            },
            labelStyle: {
                fontSize: 14,
                color: Color.black,
                fontFamily:'OpenSans-SemiBold'
            },
            activeBackgroundColor: Color.bgHeader,
            inactiveBackgroundColor: Color.transparent,
        } */
  }
);
