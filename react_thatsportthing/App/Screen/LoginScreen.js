import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NetInfo,
  AsyncStorage,
  Platform,
  Alert,
  SafeAreaView
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
import ApiUrl from "../Network/ApiUrl";
import firebase from "react-native-firebase";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isProgress: false,
      showPassword: true
    };
    this.getToken();
    this._configureGoogleSignIn();
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
  _configureGoogleSignIn() {
    GoogleSignin.configure();
  }
  doValidEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  }
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  doLogin(screen) {
    const { navigate } = this.props.navigation;
    if (this.state.userName == "") {
      alert("Enter Email");
      this.refs.username.focus();
    } else if (!this.doValidEmail(this.state.userName)) {
      alert("Enter Valid Email");
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
              conversation_count: result.conversation_count,
              notification_count: result.notification_count,
              user_name: result.user_name,
              token: result.token,
              login_type: "simple"
            };
            const stringifiedArray = JSON.stringify(userData);
            AsyncStorage.setItem("data", stringifiedArray);
            AsyncStorage.setItem("logged", "true");
            this.doLoginFinish(screen);
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
  doLoginFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  doFinish(screen,loginData) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen,params:{loginData:loginData} })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  doBack() {
    this.props.navigation.goBack();
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
  doGoogleLogin() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this._signIn();
      } else {
        Alert.alert(
          "Internet Connection",
          "Kindly connect to internet then try again"
        );
      }
    });
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);

      this.setState({ userInfo, error: null });
      this.openProgressbar();
      this.doSocialLogin(undefined, "google", userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        this.doShowSnackBar(error.toString());
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        this.doShowSnackBar(error.toString());
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.doShowSnackBar("Play Services not available or outdated");
        console.log(error);
      } else {
        this.doShowSnackBar(error.toString());
        console.log(error);
      }
    }
  };
  doSocialLogin(result, login_type, google_result) {
    console.log("doSocialLogin", result, login_type);

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("token")
          .then(data => {
            if (data != null) {
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
              bodyData.append("dob", "");
              bodyData.append("device_type", Platform.OS);
              bodyData.append("fire_base_token", data);
              bodyData.append("gender", "");

              this.doSocialLoginApi(bodyData, login_type);
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
              conversation_count: result.conversation_count,
              notification_count: result.notification_count,
              user_name: result.user_name,
              token: result.token,
              login_type: login_type
            };
            const stringifiedArray = JSON.stringify(userData);
            AsyncStorage.setItem("data", stringifiedArray);
            AsyncStorage.setItem("logged", "true");

            const loginData = {
              login_type: login_type,
              full_name: result.full_name,
              profile_image: result.profile_image
            };
            this.doFinish("WelcomeSocialScreen", loginData);

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
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          resizeMethod="auto"
          source={Icons.logo}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            marginBottom: 10,
            fontFamily: "OpenSans-SemiBold",
            color: Colors.colorEdittext,
            fontSize: 12
          }}
        >
          SIGN UP WITH...
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5,height:40 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doFacebookLogin()}
          >
            <View style={styles.fbView}>
              <Text style={styles.fbText}>FACEBOOK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doGoogleLogin()}
          >
            <View style={styles.googleView}>
              <Text style={styles.googleText}>GOOGLE +</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center",marginTop:5,marginBottom:5 }}>
          <View
            style={{
              borderWidth: 1,
              height: 1,
              flex: 1,
              borderColor: Colors.colorSearch,
              marginEnd: 10
            }}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              marginBottom: 5,
              fontFamily: "OpenSans-SemiBold",
              color: Colors.colorEdittext,
              fontSize: 12
            }}
          >
            OR
          </Text>
          <View
            style={{
              borderWidth: 1,
              height: 1,
              flex: 1,
              borderColor: Colors.colorSearch,
              marginStart: 10
            }}
          />
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
              autoCapitalize="none"
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
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              borderBottomColor: Colors.colorEdittext,
              borderBottomWidth: 1
            }}
          >
            <TextInput
              ref={"password"}
              onChangeText={password => this.setState({ password: password })}
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",

                  paddingBottom: 5,
                  flex: 1
                }
              ]}
              keyboardType="ascii-capable"
              secureTextEntry={this.state.showPassword}
              placeholder={"Password"}
              value={this.state.password}
              placeholderTextColor={Colors.colorEdittext}
              underlineColorAndroid={Colors.transparent}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={this.toggleSwitch.bind(this)}>
              <Image
                source={
                  this.state.showPassword ? Icons.ic_show_pw : Icons.ic_hide_pw
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
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
            
            position:'absolute',
            bottom:0
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
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  logo: { marginTop: 20, marginLeft: "5%", height: 100, width: 152 },
  textField: {
    marginLeft: "5%",
    marginRight: "5%",

    justifyContent: "center"
  },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
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
  editText: { color: Colors.colorEdittext, fontSize: 18, padding: 0 },
  fbView: {
    flex: 1,
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#5c9be5",
    alignItems: "center",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginEnd: 5
  },
  googleView: {
    flex: 1,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d0021b",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginStart: 5
  },
  fbText: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "OpenSans-Bold",
    color: "#5c9be5",
    fontSize: 20
  },
  googleText: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "OpenSans-Bold",
    color: "#d0021b",
    fontSize: 20
  }
});
export default LoginScreen;
