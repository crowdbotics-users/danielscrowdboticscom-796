import { createStackNavigator } from "react-navigation";
import { YellowBox, NativeModules } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
YellowBox.ignoredYellowBox = ["Warning:"];
console.disableYellowBox = true;

import Colors from "./App/Resource/Colors";

import LoginType from "./App/Screen/LoginTypeScreen";
import Login from "./App/Screen/LoginScreen";
import SignUp1 from "./App/Screen/SignUpScreen1";
import SignUp2 from "./App/Screen/SignUpScreen2";
import SignUp3 from "./App/Screen/SignUpScreen3";
import StreamScreen from "./App/Screen/StreamScreen";
import HomePage from "./App/Screen/HomePage";


const App = createStackNavigator(
  {
    LoginType: { screen: LoginType },
    Login: { screen: Login },
    SignUp1: { screen: SignUp1 },
    SignUp2: { screen: SignUp2 },
    SignUp3: { screen: SignUp3 },
    StreamScreen: { screen: StreamScreen },
    
    HomePage: {
      screen: HomePage,
      navigationOptions:{
        header:null
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
