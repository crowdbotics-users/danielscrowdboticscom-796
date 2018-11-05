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
/*
const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <DrawerIcon navigationProps={navigation} title={"Home"} />
      ),
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const AddNewPostNavigator = createStackNavigator({
  AddNewPost: {
    screen: AddNewPost,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <DrawerIcon navigationProps={navigation} title={"Add New Post"} />
      ),
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});

const MoreCategoryNavigator = createStackNavigator({
  AddNewPost: {
    screen: MoreCategoryScreen,
    navigationOptions: ({ navigation }) => ({
    
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});


const MyPostNavigator = createStackNavigator({
  MyPost: {
    screen: MyPost,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigationProps={navigation} title={"My Post"} />,
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigationProps={navigation} title={"Profile"} />,
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const RateUsNavigator = createStackNavigator({
  RateUs: {
    screen: RateUs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigationProps={navigation} title={"Rate Us"} />,
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const AboutUsNavigator = createStackNavigator({
  AboutUs: {
    screen: AboutUs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <DrawerIcon navigationProps={navigation} title={"About Us"} />
      ),
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const TermsNavigator = createStackNavigator({
  TermsAndConditions: {
    screen: TermsAndConditions,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <DrawerIcon
          navigationProps={navigation}
          title={"Terms And Conditions"}
        />
      ),
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const LegalNavigator = createStackNavigator({
  Legal: {
    screen: Legal,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigationProps={navigation} title={"Legal"} />,
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
});
const LogoutNavigator = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.colorPrimary
      }
    })
  }
}); */


export default HomePage = createDrawerNavigator(
  {
    StreamScreen: { screen: StreamScreenNavigator },
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
    initialRouteName: 'StreamScreen',
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
