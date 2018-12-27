import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  NetInfo,
  AsyncStorage,
  Platform,
  Alert
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
import ApiUrl from "../Network/ApiUrl";
import firebase from "react-native-firebase";
import Snackbar, { showSnackBar } from "@prince8verma/react-native-snackbar";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isProgress: false
    };
    this.getToken();
  }
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
  static navigationOptions = {
    header: null
  };
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  //redirect home page

  doLogin(screen) {
    const { navigate } = this.props.navigation;
    if (this.state.userName == "") {
      alert("Enter User Name");
      this.refs.username.focus();
    } else if (this.state.password == "") {
      alert("Enter Password");
      this.refs.password.focus();
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("token")
            .then(data => {
              if (data != null) {
                const bodyData = JSON.stringify({
                  email: this.state.userName,
                  password: this.state.password,
                  device_type: Platform.OS,
                  fire_base_token: data
                });

                this.openProgressbar();
                this.doLoginApi(bodyData, screen);
              } else {
              }
            })
            .done();
        } else {
          Alert.alert(
            "Internet Connection",
            "Kindly connect to internet then try again"
          );
        }
      });
    }
  }
  doLoginApi(bodyData, screen) {
    const { navigate } = this.props.navigation;
    fetch(ApiUrl.loginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressbar();
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
              login_type:'simple'
            };
            const stringifiedArray = JSON.stringify(userData);
            AsyncStorage.setItem("data", stringifiedArray);
            AsyncStorage.setItem("logged", "true");
            this.doFinish(screen);
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
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  doBack() {
    this.props.navigation.goBack();
  }

  render() {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.logo} />
        </View>
        <View style={styles.textField}>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              ref={"username"}
              onChangeText={username => this.setState({ userName: username })}
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.colorEdittext,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              value={this.state.userName}
              keyboardType="email-address"
              placeholder={"Email Address"}
              placeholderTextColor={Colors.colorEdittext}
              underlineColorAndroid={Colors.transparent}
              autoCapitalize = 'none'
              returnKeyType="next"
            />
            <Text
              style={[
                styles.editText,
                styles.labelName,
                { fontFamily: "OpenSans-SemiBold" }
              ]}
            >
              Email Address
            </Text>
          </View>
          <ProgressCompoment isProgress={this.state.isProgress} />
          <View style={{ marginTop: 20 }}>
            <TextInput
              ref={"password"}
              onChangeText={password => this.setState({ password: password })}
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.colorEdittext,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Password"}
              value={this.state.password}
              placeholderTextColor={Colors.colorEdittext}
              underlineColorAndroid={Colors.transparent}
              returnKeyType="done"
            />
          </View>
          <Text
            style={[
              styles.editText,
              styles.labelName,
              { fontFamily: "OpenSans-SemiBold" }
            ]}
          >
            PASSWORD
          </Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => this.doRedirect("ForgotPasswordScreen")}
          >
            <Text
              style={[
                styles.editText,
                styles.labelName,
                { fontFamily: "OpenSans-SemiBold" }
              ]}
            >
              FORGOT YOUR PASSWORD?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30
          }}
        >
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => this.doBack()}>
              <View style={styles.backbutton}>
                <Text
                  style={[
                    styles.backbuttonText,
                    { fontFamily: "JosefinSans-Bold" }
                  ]}
                >
                  BACK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => this.doLogin("HomePage")}>
              <View style={styles.button}>
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
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  logo: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginStart: "10%"
  },
  logoImage: { height: 100, width: 152 },
  textField: {
    flex: 1,
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center"
  },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext },
  buttonView: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    marginBottom: "10%",
    backgroundColor: Colors.bgHeader,
    marginLeft: 10,
    width: Dimensions.get("screen").width / 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  backbutton: {
    marginBottom: "10%",
    marginRight: 10,
    borderWidth: 1,
    width: Dimensions.get("screen").width / 2,
    borderColor: Colors.bgHeader,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  backbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.bgHeader
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  editText: { color: Colors.colorEdittext, fontSize: 18, padding: 0 }
});
export default LoginScreen;
