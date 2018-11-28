import { createStackNavigator } from "react-navigation";
import Colors from "./App/Resource/Colors";

import LoginType from "./App/Screen/LoginTypeScreen";
import Login from "./App/Screen/LoginScreen";
import SignUp1 from "./App/Screen/SignUpScreen1";
import SignUp2 from "./App/Screen/SignUpScreen2";
import SignUp3 from "./App/Screen/SignUpScreen3";
import ForgotPasswordScreen from "./App/Screen/ForgotPasswordScreen";
import HomePage from "./App/Screen/HomePage";
import HomeTabScreen from "./App/Screen/HomeTabScreen";
import ProfileScreen from "./App/Screen/ProfileScreen";
import EditProfileScreen from "./App/Screen/EditProfileScreen";
import AddPostScreen from "./App/Screen/AddPostScreen";
import OneTimePasswordScreen from "./App/Screen/OneTimePasswordScreen";
import UpdatePasswordScreen from "./App/Screen/UpdatePasswordScreen";
import CommentListScreen from "./App/Screen/CommentListScreen";
import AddCommentScreen from "./App/Screen/AddCommentScreen";
import MyCrewScreen from "./App/Screen/MyCrewScreen";
import MyFollowersScreen from "./App/Screen/MyFollowersScreen";

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
const EditProfileScreenNavigator = createStackNavigator({
  EditProfileScreen: {
    screen: EditProfileScreen
  }
});
const MyCrewScreenNavigator = createStackNavigator({
  MyCrewScreen: {
    screen: MyCrewScreen
  }
});
const MyFollowersScreenNavigator = createStackNavigator({
  MyFollowersScreen: {
    screen: MyFollowersScreen
  }
});
const AddPostScreenNavigator = createStackNavigator({
  AddPostScreen: {
    screen: AddPostScreen
  }
});
const AddCommentScreenNavigator = createStackNavigator({
  AddCommentScreen: {
    screen: AddCommentScreen
  }
});
const CommentListScreenNavigator = createStackNavigator({
  CommentListScreen: {
    screen: CommentListScreen
  }
});
const App = createStackNavigator(
  {
    LoginType: { screen: LoginType },
    Login: { screen: Login },
    SignUp1: { screen: SignUp1 },
    SignUp2: { screen: SignUp2 },
    SignUp3: { screen: SignUp3 },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    OneTimePasswordScreen: { screen: OneTimePasswordScreen },
    UpdatePasswordScreen: { screen: UpdatePasswordScreen },
    HomeTabScreen: { screen: HomePageNavigator },
    ProfileScreen: { screen: ProfileScreenNavigator },
    EditProfileScreen: {
      screen: EditProfileScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    AddPostScreen: {
      screen: AddPostScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    AddCommentScreen: {
      screen: AddCommentScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MyCrewScreen: {
      screen: MyCrewScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MyFollowersScreen: {
      screen: MyFollowersScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    CommentListScreen: {
      screen: CommentListScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "LoginType",
    headerMode: "float",
    navigationOptions: {
      gesturesEnabled: false,
      headerTitleStyle: {
        color: Colors.black
      },
      headerStyle: {
        backgroundColor: Colors.colorBg
      }
    }
  }
);
export default App;
