import { createStackNavigator } from "react-navigation";
import Colors from "./App/Resource/Colors";

import LoginType from "./App/Screen/LoginTypeScreen";
import Login from "./App/Screen/LoginScreen";
import SignUp1 from "./App/Screen/SignUpScreen1";
import SignUp2 from "./App/Screen/SignUpScreen2";
import SignUp3 from "./App/Screen/SignUpScreen3";
import ForgotPasswordScreen from "./App/Screen/ForgotPasswordScreen";
import HomePage from "./App/Screen/HomePage";

import EditProfileScreen from "./App/Screen/EditProfileScreen";
import AddPostScreen from "./App/Screen/AddPostScreen";
import OneTimePasswordScreen from "./App/Screen/OneTimePasswordScreen";
import UpdatePasswordScreen from "./App/Screen/UpdatePasswordScreen";
import CommentListScreen from "./App/Screen/CommentListScreen";
import AddCommentScreen from "./App/Screen/AddCommentScreen";
import MyCrewScreen from "./App/Screen/MyCrewScreen";
import MyFollowersScreen from "./App/Screen/MyFollowersScreen";
import ProfileScreen from "./App/Screen/ProfileScreen";
import ReplyCommentListScreen from "./App/Screen/ReplyCommentListScreen";
import AddReplyScreen from "./App/Screen/AddReplyScreen";
import TestScreen from "./App/Screen/TestScreen";
import MessageListScreen from "./App/Screen/Messages/MessageListScreen";
import SendMessageScreen from "./App/Screen/Messages/SendMessageScreen";
import NotificationSettingScreen from "./App/Screen/AccountSetting/NotificationSettingScreen";
import PrivacySettingScreen from "./App/Screen/AccountSetting/PrivacySettingScreen";
import SecuritySettingScreen from "./App/Screen/AccountSetting/SecuritySettingScreen";
import ChangePasswordScreen from "./App/Screen/Secutiry/ChangePasswordScreen";
import SaveLoginInfoScreen from "./App/Screen/Secutiry/SaveLoginInfoScreen";
import ActivityStatusScreen from "./App/Screen/Privacy/ActivityStatusScreen";
import PhotoVideosPrivacyScreen from "./App/Screen/Privacy/PhotoVideosPrivacyScreen";
import DownloadYourDataScreen from "./App/Screen/Secutiry/DownloadYourDataScreen";
import SearchHistoryScreen from "./App/Screen/Secutiry/SearchHistoryScreen";
import AccountPrivateScreen from "./App/Screen/Privacy/AccountPrivateScreen";
import BlockedAccountScreen from "./App/Screen/Privacy/BlockedAccountScreen";
import HomScreen from "./App/Screen/Home/HomScreen";
import MyProfileScreen from "./App/Screen/MyProfile/MyProfileScreen";
import SignUpScreen1 from "./App/Screen/Register/SignUpScreen1";
import SignUpScreen2 from "./App/Screen/Register/SignUpScreen2";
import WelcomeSocialScreen from "./App/Screen/Login/WelcomeSocialScreen";
import FavoriteSportScreen from "./App/Screen/FavoriteSports/FavoriteSportScreen";
import SearchResultScreen from "./App/Screen/Home/SearchResultScreen";
import MessageRequestScreen from "./App/Screen/Messages/MessageRequestScreen";
import MessageConversationScreen from "./App/Screen/Messages/MessageConversationScreen";

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
const AddReplyScreenNavigator = createStackNavigator({
  AddReplyScreen: {
    screen: AddReplyScreen
  }
});
const CommentListScreenNavigator = createStackNavigator({
  CommentListScreen: {
    screen: CommentListScreen
  }
});
const ReplyCommentListScreenNavigator = createStackNavigator({
  ReplyCommentListScreen: {
    screen: ReplyCommentListScreen
  }
});
const ProfileScreenNavigator = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen
  }
});
const MessageListScreenNavigator = createStackNavigator({
  MessageListScreen: {
    screen: MessageListScreen
  }
});
const SendMessageScreenNavigator = createStackNavigator({
  SendMessageScreen: {
    screen: SendMessageScreen
  }
});
const NotificationSettingScreenNavigator = createStackNavigator({
  NotificationSettingScreen: {
    screen: NotificationSettingScreen
  }
});
const PrivacySettingScreenNavigator = createStackNavigator({
  PrivacySettingScreen: {
    screen: PrivacySettingScreen
  }
});
const SecuritySettingScreenNavigator = createStackNavigator({
  SecuritySettingScreen: {
    screen: SecuritySettingScreen
  }
});
const ChangePasswordScreenNavigator = createStackNavigator({
  ChangePasswordScreen: {
    screen: ChangePasswordScreen
  }
});
const SaveLoginInfoScreenNavigator = createStackNavigator({
  SaveLoginInfoScreen: {
    screen: SaveLoginInfoScreen
  }
});
const ActivityStatusScreenNavigator = createStackNavigator({
  ActivityStatusScreen: {
    screen: ActivityStatusScreen
  }
});
const PhotoVideosPrivacyScreenNavigator = createStackNavigator({
  PhotoVideosPrivacyScreen: {
    screen: PhotoVideosPrivacyScreen
  }
});
const DownloadYourDataScreenNavigator = createStackNavigator({
  DownloadYourDataScreen: {
    screen: DownloadYourDataScreen
  }
});
const SearchHistoryScreenNavigator = createStackNavigator({
  SearchHistoryScreen: {
    screen: SearchHistoryScreen
  }
});
const AccountPrivateScreenNavigator = createStackNavigator({
  AccountPrivateScreen: {
    screen: AccountPrivateScreen
  }
});
const BlockedAccountScreenNavigator = createStackNavigator({
  BlockedAccountScreen: {
    screen: BlockedAccountScreen
  }
});
const HomScreenNavigator = createStackNavigator({
  HomScreen: {
    screen: HomScreen
  }
});
const MyProfileScreenNavigator = createStackNavigator({
  MyProfileScreen: {
    screen: MyProfileScreen
  }
});
const FavoriteSportScreenNavigator = createStackNavigator({
  FavoriteSportScreen: {
    screen: FavoriteSportScreen
  }
});
const SearchResultScreenNavigator = createStackNavigator({
  SearchResultScreen: {
    screen: SearchResultScreen
  }
});
const MessageRequestScreenNavigator = createStackNavigator({
  SearchResultScreen: {
    screen: MessageRequestScreen
  }
});
const MessageConversationScreenNavigator = createStackNavigator({
  MessageConversationScreen: {
    screen: MessageConversationScreen
  }
});
const Main = createStackNavigator(
  {
    TestScreen: { screen: TestScreen },
    LoginType: { screen: LoginType },
    Login: { screen: Login },
    SignUpScreen1: { screen: SignUpScreen1 },
    SignUpScreen2: { screen: SignUpScreen2 },
    WelcomeSocialScreen: { screen: WelcomeSocialScreen },
    SignUp1: { screen: SignUp1 },
    SignUp2: { screen: SignUp2 },
    SignUp3: { screen: SignUp3 },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    OneTimePasswordScreen: { screen: OneTimePasswordScreen },
    UpdatePasswordScreen: { screen: UpdatePasswordScreen },
    ProfileScreen: {
      screen: ProfileScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
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
    AddReplyScreen: {
      screen: AddReplyScreenNavigator,
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
    ReplyCommentListScreen: {
      screen: ReplyCommentListScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MessageListScreen: {
      screen: MessageListScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    SendMessageScreen: {
      screen: SendMessageScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    NotificationSettingScreen: {
      screen: NotificationSettingScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    PrivacySettingScreen: {
      screen: PrivacySettingScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    SecuritySettingScreen: {
      screen: SecuritySettingScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    ChangePasswordScreen: {
      screen: ChangePasswordScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    SaveLoginInfoScreen: {
      screen: SaveLoginInfoScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    ActivityStatusScreen: {
      screen: ActivityStatusScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    PhotoVideosPrivacyScreen: {
      screen: PhotoVideosPrivacyScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    DownloadYourDataScreen: {
      screen: DownloadYourDataScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    SearchHistoryScreen: {
      screen: SearchHistoryScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    AccountPrivateScreen: {
      screen: AccountPrivateScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    BlockedAccountScreen: {
      screen: BlockedAccountScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    HomScreen: {
      screen: HomScreenNavigator,
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
    FavoriteSportScreen: {
      screen: FavoriteSportScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    SearchResultScreen: {
      screen: SearchResultScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MessageRequestScreen: {
      screen: MessageRequestScreenNavigator,
      navigationOptions: {
        header: null
      }
    },
    MessageConversationScreen: {
      screen: MessageConversationScreenNavigator,
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
export default Main;
