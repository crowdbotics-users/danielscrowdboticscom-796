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
import type { Notification, NotificationOpen } from "react-native-firebase";
import styles from "../Resource/Styles";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../Network/ApiUrl";

class LoginTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = {
      isProgress: false,
      token: ""
    };
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
    const notificationOpen: NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      var seen = [];
      alert(
        JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
              return;
            }
            seen.push(val);
          }
          return val;
        })
      );
    }
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        notification.android
          .setChannelId("test-channel")
          .android.setSmallIcon("ic_launcher");
        firebase.notifications().displayNotification(notification);
      });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        alert(
          JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          })
        );
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      console.log("fcmToken", fcmToken);
      this.setState({ token: fcmToken });
      AsyncStorage.setItem("token", fcmToken);
    } else {
      console.log("fcmToken", fcmToken);
      // user doesn't have a device token yet
    }

    AsyncStorage.getItem("logged")
      .then(data => {
        if (data != null) {
          if (data == "true") {
            this.doFinish("HomePage");
          }
        }
      })
      .done();
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
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doFbLogin() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        alert('Facebook Login');
        // this.doFacebookLogin();
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
  doSocialLogin(result, login_type) {
    console.log("doSocialLogin", result, login_type);

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        const bodyData = new FormData();
        bodyData.append("profile_image", {
          uri: login_type == "facebook" ? result.picture.data.url : "",
          type: "image/jpeg",
          name: "image2.jpeg"
        });

        bodyData.append("login_id", login_type == "facebook" ? result.id : 0);
        bodyData.append("login_type", login_type);
        bodyData.append(
          "full_name",
          login_type == "facebook"
            ? result.first_name + "" + result.last_name
            : "Bhavin Parghi"
        );
        bodyData.append("dob", "1993-01-21");
        bodyData.append("device_type", Platform.OS);
        bodyData.append("fire_base_token", this.state.token);

        this.doSocialLoginApi(bodyData);
      } else {
        Alert.alert(
          "Internet Connection",
          "Kindly connect to internet then try again"
        );
      }
    });
  }
  doSocialLoginApi(bodyData) {
    console.log('doSocialLoginApi',bodyData);
    
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
        console.log('responseJson',responseJson);
        
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
              token: result.token
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
    alert("google");
  }
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
              <TouchableOpacity onPress={() => this.doFbLogin()}>
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
