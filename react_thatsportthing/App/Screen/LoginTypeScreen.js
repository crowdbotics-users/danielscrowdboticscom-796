import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform,
  AsyncStorage,
  ActivityIndicator,
  NetInfo,
  Alert
} from "react-native";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import firebase from "react-native-firebase";
import { BallIndicator } from "react-native-indicators";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
import { RemoteMessage, NotificationOpen } from "react-native-firebase";
import styles from "../Resource/Styles";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../Network/ApiUrl";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User
} from "react-native-google-signin";
import NotificationConfiguration from "../Notificaiton/NotificationConfiguration";

class LoginTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = {
      isProgress: false,
      token: "",
      userInfo: null,
      error: null
    };
    new NotificationConfiguration();
  }
  static navigationOptions = {
    header: null
  };
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      console.log("fcmToken", fcmToken);
      this.setState({ token: fcmToken });
      AsyncStorage.setItem("token", fcmToken);
    } else {
      console.log("fcmToken", fcmToken);
      // user doesn't have a device token yet
    }
  }
  async componentDidMount() {
    await firebase.messaging().requestPermission();
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log("permission allowed");
    } else {
      console.log("permission denied");
      // user doesn't have permission
    }

    

    AsyncStorage.getItem("logged")
      .then(data => {
        if (data != null) {
          if (data == "true") {
            this.doFinish("HomePage");
          } else {
            // LoginManager.logOut();
          }
        } else {
          // LoginManager.logOut();
        }
      })
      .done();
    this._configureGoogleSignIn();
    this.messageListener = firebase
      .messaging()
      .onMessage((message: RemoteMessage) => {
        // Process your message as required
        // console.log(message._data);
        const data = message._data;
        const notification = new firebase.notifications.Notification()
          .setNotificationId("notificationId")
          .setTitle(data.title)
          .setBody(data.body)
          

        notification.android
          .setChannelId("com.thatsportthing")
          .android.setSmallIcon("ic_launcher");
        notification.android.setAutoCancel(true)
        .setSound('default')
        .setTitle(data.title)
        .setBody(data.body)
         firebase.notifications().displayNotification(notification);
      });
    
  }
  
  _configureGoogleSignIn() {
    GoogleSignin.configure();
  }
  componentWillUnmount() {
    this.messageListener();
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doFbLogin() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.doFacebookLogin();
      } else {
        Alert.alert(
          "Internet Connection",
          "Kindly connect to internet then try again"
        );
      }
    });
  }
  async doFacebookLogin() {
    let { isCancelled } = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email"
    ]);

    if (!isCancelled) {
      this.openProgressbar();
      let data = await AccessToken.getCurrentAccessToken();
      let token = data.accessToken.toString();
      await this.afterLoginComplete(token);
    } else {
      console.log("Login incomplete");
    }
  }
  afterLoginComplete = async token => {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=cover,email,id,name,first_name,last_name,gender,picture.height(750)&access_token=${token}`
    );
    let result = await response.json();
    console.log("afterLoginComplete", result);
    this.doSocialLogin(result, "facebook", undefined);
  };
  doSocialLogin(result, login_type, google_result) {
    console.log("doSocialLogin", result, login_type);

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        const bodyData = new FormData();
        bodyData.append("profile_image", {
          uri:
            login_type == "facebook"
              ? result.picture.data.url
              : google_result.photo,
          type: "image/jpeg",
          name: "image2.jpeg"
        });

        bodyData.append(
          "login_id",
          login_type == "facebook" ? result.id : google_result.id
        );
        bodyData.append("login_type", login_type);
        bodyData.append(
          "full_name",
          login_type == "facebook"
            ? result.first_name + " " + result.last_name
            : google_result.name
        );
        bodyData.append("dob", "1993-01-21");
        bodyData.append("device_type", Platform.OS);
        bodyData.append("fire_base_token", this.state.token);
        bodyData.append("gender", "male");

        this.doSocialLoginApi(bodyData, login_type);
      } else {
        Alert.alert(
          "Internet Connection",
          "Kindly connect to internet then try again"
        );
      }
    });
  }
  doSocialLoginApi(bodyData, login_type) {
    console.log("doSocialLoginApi", bodyData);

    const { navigate } = this.props.navigation;
    fetch(ApiUrl.socialLoginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson", responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            this.hideProgressbar();
            const result = responseJson.result;
            const userData = {
              id: result.id,
              full_name: result.full_name,
              email: result.email,
              profile_image: result.profile_image,
              cover_image: result.cover_image,
              follower_count: result.follower_count,
              crew_count: result.crew_count,
              user_name: result.user_name,
              token: result.token,
              login_type: login_type
            };
            const stringifiedArray = JSON.stringify(userData);
            AsyncStorage.setItem("data", stringifiedArray);
            AsyncStorage.setItem("logged", "true");
            this.doFinish("HomePage");
            break;
          }
          case 401: {
            this.hideProgressbar();
            this.doShowSnackBar(message);

            break;
          }
          case 400: {
            this.hideProgressbar();
            this.doShowSnackBar(message);

            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
      });
  }
  doShowSnackBar(message) {
    showSnackBar({
      message: message,
      position: "top",
      backgroundColor: Colors.bgHeader,
      buttonColor: "#fff",
      confirmText: "",
      onConfirm: () => {},
      duration: 1000
    });
  }
  doGoogleLogin() {
    this.openProgressbar();
    this._signIn();
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);

      this.setState({ userInfo, error: null });
      this.doSocialLogin(undefined, "google", userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        console.log(error);

        Alert.alert("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("play services not available or outdated");
      } else {
        Alert.alert("Something went wrong", error.toString());
        this.setState({
          error
        });
      }
    }
  };
  render() {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
      <View
        style={{
          backgroundColor: Colors.bgHeader,
          flex: 1
        }}
      >
      
        <View style={{ flex: 1, position: "relative", alignItems: "center" }}>
          <View style={{ marginTop: "20%" }}>
            <Image
              source={Icons.ic_splash_logo}
              style={{ width: 300, height: 300 }}
            />
          </View>
          <View style={{ position: "absolute", top: 270 }}>
            <BallIndicator
              color={this.state.isProgress ? Colors.navBg : Colors.transparent}
            />
          </View>
        </View>
        <View
          style={{ flex: 1, position: "absolute", bottom: 0, width: "100%" }}
        >
          <View style={styles.row}>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
              <View style={customStyles.buttonLogin}>
                <Text style={customStyles.buttonText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp1")}>
              <View style={customStyles.buttonSignUp}>
                <Text style={customStyles.buttonText}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.white,
              fontFamily: "OpenSans-SemiBold",
              marginTop: 10,
              marginBottom: 10
            }}
          >
            OR YOU CAN LOGIN WITH...
          </Text>
          <View style={{ backgroundColor: Colors.white }}>
            <View style={[styles.row, { marginTop: 15, marginBottom: 15 }]}>
              <TouchableOpacity onPress={() => this.doFacebookLogin()}>
                <View
                  style={[customStyles.buttonLogin, { borderColor: "#5c9be5" }]}
                >
                  <Text style={[customStyles.buttonText, { color: "#5c9be5" }]}>
                    FACEBOOK
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.doGoogleLogin()}>
                <View
                  style={[
                    customStyles.buttonSignUp,
                    { borderColor: "#d0021b" }
                  ]}
                >
                  <Text style={[customStyles.buttonText, { color: "#d0021b" }]}>
                    GOOGLE +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  background: { height: "100%", width: "100%" },
  mainView: {
    position: "absolute",
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width,
    marginBottom: Platform.OS == "android" ? 30 : 0,
    bottom: "5%"
  },
  buttonTopView: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center"
  },
  buttonLogin: {
    marginRight: 5,
    width: Dimensions.get("screen").width / 2,
    borderColor: Colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  buttonSignUp: {
    marginLeft: 5,
    width: Dimensions.get("screen").width / 2,
    borderColor: Colors.white,

    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.white,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 20,
    marginBottom: 20
  }
});

export default LoginTypeScreen;
