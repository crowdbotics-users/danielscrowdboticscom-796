import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import DrawerContent from "../Compoments/DrawerContent";
import MyCrewScreen from "./MyCrewScreen";
import Colors from "../Resource/Colors";
import AccountSettingScreen from "./AccountSetting/AccountSettingScreen";
import HomScreen from "./Home/HomScreen";
import MyProfileScreen from "./MyProfile/MyProfileScreen";

const HomePageNavigator = createStackNavigator({
  HomeTabScreen: {
    screen: HomScreen
  }
});

const MyCrewScreenNavigator = createStackNavigator({
  MyCrewScreen: {
    screen: MyCrewScreen
  }
});
const AccountSettingScreenNavigator = createStackNavigator({
  AccountSettingScreen: {
    screen: AccountSettingScreen
  }
});
const MyProfileScreenNavigator = createStackNavigator({
  MyProfileScreen: {
    screen: MyProfileScreen
  }
});

const HomePage = createDrawerNavigator(
  {
    HomeTabScreen: { screen: HomePageNavigator },
  
    MyCrewScreen: {
      screen: MyCrewScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MyProfileScreen: {
      screen: MyProfileScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    AccountSettingScreen: {
      screen: AccountSettingScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "HomeTabScreen",
    contentComponent: DrawerContent,
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerBackgroundColor: Colors.navBg,
    contentOptions: {
      activeTintColor: Colors.white,
      labelStyle: {
        color: Colors.white
      }
    }
  }
);

export default HomePage;
