import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform,
  AsyncStorage
} from "react-native";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import firebase from "react-native-firebase";
import { NavigationActions, StackActions } from "react-navigation";
import { RemoteMessage } from "react-native-firebase";
import styles from "../Resource/Styles";

import { showSnackBar } from "@prince8verma/react-native-snackbar";
import NotificationConfiguration from "../Notificaiton/NotificationConfiguration";

class LoginTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = {
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
    this.messageListener = firebase
      .messaging()
      .onMessage((message: RemoteMessage) => {
        // Process your message as required
        // console.log(message._data);
        const data = message._data;
        const notification = new firebase.notifications.Notification()
          .setNotificationId("notificationId")
          .setTitle(data.title)
          .setBody(data.body);

        notification.android
          .setChannelId("com.thatsportthing")
          .android.setSmallIcon("ic_launcher");
        notification.android
          .setAutoCancel(true)
          .setSound("default")
          .setTitle(data.title)
          .setBody(data.body);
        firebase.notifications().displayNotification(notification);
      });
  }

  componentWillUnmount() {
    this.messageListener();
  }

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

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.bgHeader,
          flex: 1
        }}
      >
        <View style={{ flex: 1, position: "relative", alignItems: "center" }}>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              flex: 1
            }}
          >
            <Image
              source={Icons.ic_splash_logo}
              style={{ width: 300, height: 300 }}
            />
          </View>
          
        </View>
        <View
          style={{ flex: 1, position: "absolute", bottom: 0, width: "100%" }}
        >
          <View style={[styles.row, { marginBottom: 30 }]}>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
              <View style={customStyles.buttonLogin}>
                <Text style={customStyles.buttonText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUpScreen1")}>
              <View style={customStyles.buttonSignUp}>
                <Text style={customStyles.buttonText}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
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
