import React, { Component } from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import DrawerContent from "../Compoments/DrawerContent";

import StreamScreen from "./StreamScreen";
import { TabContent } from "../Compoments/TabContent";
import HomeTabScreen from "./HomeTabScreen";
 const StreamScreenNavigator = createStackNavigator({
    StreamScreen: {
    screen: StreamScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <View style={[styles.row]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.white, marginLeft: 25 }}>Edit Profile</Text>
        </View>
      ),
      headerRight: (
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Color.white, marginRight: 10 }}>DONE</Text>
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: Color.colorPrimary },
      drawerLockMode: 'locked-closed'

    })
  }
});





export default HomePage = createDrawerNavigator(
  {
    StreamScreen: { screen: StreamScreenNavigator },
    TabContent:{screen:TabContent},
    HomeTabScreen:{screen:HomeTabScreen},
    
    /*  Home: { screen: HomeNavigator },
    AddNewPost: { screen: AddNewPostNavigator },
    MyPost: { screen: MyPostNavigator },
    Profile: { screen: ProfileNavigator },
    RateUs: { screen: RateUsNavigator },
    AboutUs: { screen: AboutUsNavigator },
    TermsAndConditions: { screen: TermsNavigator },
    Legal: { screen: LegalNavigator },
    Logout: { screen: LogoutNavigator },
    EditProfileScreen: { screen: EditProfileNavigator }, */
   
  },
  {
    initialRouteName: 'TabContent',
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
