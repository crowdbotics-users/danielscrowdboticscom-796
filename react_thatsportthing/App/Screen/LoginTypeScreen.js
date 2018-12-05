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
  AsyncStorage, ActivityIndicator
} from "react-native";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import firebase from "react-native-firebase";
import { BallIndicator } from "react-native-indicators";
import ProgressCompoment from '../Compoments/ProgressCompoment';
import { NavigationActions, StackActions } from "react-navigation";
import type { Notification, NotificationOpen } from "react-native-firebase";
class LoginTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = {
      isProgress: false
    }
  }
  static navigationOptions = {
    header: null
  };
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      console.log("fcmToken", fcmToken);
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
        JSON.stringify(notification.data, function (key, val) {
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
          JSON.stringify(notification.data, function (key, val) {
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
      AsyncStorage.setItem("token", fcmToken);
    } else {
      console.log("fcmToken", fcmToken);
      // user doesn't have a device token yet
    }
    this.openProgressbar();
    AsyncStorage.getItem("logged")
      .then(data => {

        this.hideProgressbar();
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

  render() {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
      <View
        style={{
          backgroundColor: Colors.bgHeader,
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Image
          source={Icons.ic_splash_logo}
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
        <View style={{
          display: this.state.isProgress ? 'flex' : 'none',
          position: 'absolute', alignSelf: 'center', width: 120,
          height: 120,
          borderRadius: 5,
          backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          <Text
            style={{
              alignItems: "center", justifyContent: 'center', marginTop: 15,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: "200",
              fontFamily: "OpenSans-SemiBold",
              color: Colors.white
            }}
          >
            Loading ...
              </Text>
          <BallIndicator color={Colors.white} animationDuration={800} />
        </View>
        {/* <ProgressCompoment isProgress={this.state.isProgress} /> */}
        <View style={styles.mainView}>
          <View style={styles.buttonTopView}>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
              <View
                style={[
                  styles.buttonLogin,
                  {
                    borderTopWidth: 1,
                    borderEndWidth: 1,
                    borderBottomWidth: 1
                  }
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { fontFamily: "JosefinSans-Bold" }
                  ]}
                >
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp1")}>
              <View
                style={[
                  styles.buttonSignUp,
                  {
                    borderTopWidth: 1,
                    borderStartWidth: 1,
                    borderBottomWidth: 1
                  }
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { fontFamily: "JosefinSans-Bold" }
                  ]}
                >
                  SIGN UP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonSignUp: {
    marginLeft: 5,
    width: Dimensions.get("screen").width / 2,
    borderColor: Colors.white,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.orange,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  }
});

export default LoginTypeScreen;
