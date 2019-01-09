import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  NetInfo,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import Moment from "moment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../../Network/ApiUrl";
import DateTimePicker from "react-native-modal-datetime-picker";
import ProgressCompoment from "../../Compoments/ProgressCompoment";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import firebase from "react-native-firebase";
import { NavigationActions, StackActions } from "react-navigation";

class SignUpScreen1 extends PureComponent {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      EmailAddress: "",
      dateOfBirth: "DATE OF BIRTH",
      password:'',
      isDateTimePickerVisible: false,
      isAlreadyEmailExit: false,
      isEmailProgress: false,
      isProgress: false,
      postDob: "",
      showPassword: true,
      isMaleActive: true,
      isFemaleActive: false,
      isOtherActive: false,
      gender: "male",
      loginType: "",
      token: ""
    };
    Moment.locale();
    this.getToken();
  }
  componentDidMount() {
    this._configureGoogleSignIn();
  }
  async getToken() {
    await firebase.messaging().requestPermission();
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log("permission allowed");

      const fcmToken = await firebase.messaging().getToken();

      if (fcmToken) {
        console.log("fcmToken", fcmToken);
        this.setState({ token: fcmToken });
        AsyncStorage.setItem("token", fcmToken);
      } else {
        console.log("fcmToken", fcmToken);
        // user doesn't have a device token yet
      }
    } else {
      console.log("permission denied");
      // user doesn't have permission
    }
  }
  _configureGoogleSignIn() {
    GoogleSignin.configure();
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doRedirect(screen) {
    const { navigate } = this.props.navigation;

    if (this.state.fullName == "") {
      this.refs.name.focus();
      alert("Enter Name");
    } else if (this.state.EmailAddress == "") {
      this.refs.email.focus();
      alert("Enter Email Address");
    } else if (!this.doValidEmail(this.state.EmailAddress)) {
      this.refs.email.focus();
      alert("Enter Valid Email Address");
    } else if (this.state.isAlreadyEmailExit) {
      this.refs.email.focus();
      alert("Email Address already exists");
    } else if (
      this.state.dateOfBirth == "DATE OF BIRTH" ||
      this.state.dateOfBirth == ""
    ) {
      this.refs.bdate.focus();
      alert("Select Birth date");
    } else if (this.state.gender == "") {
      alert("Select Gender");
    } else if (this.state.password == "") {
      this.refs.password.focus();
      alert("Enter Password");
    } else {
      const userData1 = {
        name: this.state.fullName,
        email: this.state.EmailAddress,
        bdate: this.state.postDob,    
        gender:this.state.gender,
        password: this.state.password,
      };
      navigate(screen, { userData: userData1 });
    }
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
  doVerifyEmail(e) {
    if (this.state.EmailAddress == "") {
      this.refs.email.focus();
      alert("Enter Email Address");
    } else if (!this.doValidEmail(this.state.EmailAddress)) {
      this.refs.email.focus();
      alert("Enter Valid Email Address");
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("token")
            .then(data => {
              console.log("AsyncStorage");
              if (data != null) {
                console.log(data);
                const bodyData = JSON.stringify({
                  email: this.state.EmailAddress
                });
                this.setState({ isEmailProgress: true });
                this.doVerifyEmailApi(bodyData);
              } else {
                console.log(data);
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
  doVerifyEmailApi(bodyData) {
    fetch(ApiUrl.verifyEmailUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            console.log(message);

            this.setState({
              isAlreadyEmailExit: false,
              isEmailProgress: false
            });
            break;
          }
          case 401: {
            this.setState({ isAlreadyEmailExit: true, isEmailProgress: false });
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
          case 400: {
            this.setState({ isAlreadyEmailExit: true, isEmailProgress: false });
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
        }
      })
      .catch(error => {
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
        bodyData.append("fire_base_token", this.state.token);
        bodyData.append("gender", "");

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
              conversation_count: result.conversation_count==""?0:result.conversation_count,
              notification_count: result.notification_count,
              user_name: result.user_name,
              token: result.token,
              login_type: login_type
            };
            const stringifiedArray = JSON.stringify(userData);
            AsyncStorage.setItem("data", stringifiedArray);
            AsyncStorage.setItem("logged", "true");
           
            const loginData={
              login_type: login_type,
              full_name: result.full_name,
              profile_image:result.profile_image,
            }
            this.doFinish("WelcomeSocialScreen",loginData);
          
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
  doBack() {
    this.props.navigation.goBack();
  }
  doFinish(screen,loginData) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen ,params:{loginData:loginData}})]
    });
    this.props.navigation.dispatch(resetAction);
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ dateOfBirth: Moment(date).format("DD/MM/YYYY") });
    this.setState({ postDob: Moment(date).format("YYYY-MM-DD") });
    this._hideDateTimePicker();
  };
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  doChangeGender(gender) {
    if (gender == "male") {
      this.setState({
        gender: "male",
        isMaleActive: true,
        isFemaleActive: false,
        isOtherActive: false
      });
    } else if (gender == "female") {
      this.setState({
        gender: "female",
        isMaleActive: false,
        isFemaleActive: true,
        isOtherActive: false
      });
    } else if (gender == "other") {
      this.setState({
        gender: "other",
        isMaleActive: false,
        isFemaleActive: false,
        isOtherActive: true
      });
    } else {
      this.setState({
        gender: "male",
        isMaleActive: true,
        isFemaleActive: false,
        isOtherActive: false
      });
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <View style={{ marginLeft: "5%", marginEnd: "5%", marginTop: 15 }}>
              <View>
                <TextInput
                  ref={"name"}
                  onChangeText={fullName =>
                    this.setState({ fullName: fullName })
                  }
                  style={[
                    styles.editText,
                    {
                      fontFamily: "OpenSans-Bold",
                      borderBottomColor: Colors.colorEdittext,
                      borderBottomWidth: 1,
                      paddingBottom: 5
                    }
                  ]}
                  value={this.state.fullName}
                  keyboardType="ascii-capable"
                  placeholder={"FULL NAME"}
                  placeholderTextColor={Colors.colorEdittext}
                  underlineColorAndroid={Colors.transparent}
                  returnKeyType="next"
                />
                <Text
                  style={[
                    styles.editText,
                    styles.labelName,
                    { fontFamily: "OpenSans-SemiBold" }
                  ]}
                >
                  FULL NAME
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: Colors.colorEdittext,
                    borderBottomWidth: 1
                  }}
                >
                  <TextInput
                    ref={"email"}
                    onChangeText={EmailAddress =>
                      this.setState({ EmailAddress: EmailAddress })
                    }
                    style={[
                      styles.editText,
                      {
                        fontFamily: "OpenSans-Bold",
                        flex: 1,
                        paddingBottom: 5
                      }
                    ]}
                    value={this.state.EmailAddress}
                    keyboardType="email-address"
                    placeholder={"EMAIL ADDRESS"}
                    placeholderTextColor={Colors.colorEdittext}
                    underlineColorAndroid={Colors.transparent}
                    onBlur={e => this.doVerifyEmail(e)}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />
                  <ActivityIndicator
                    color={Colors.bgHeader}
                    style={{
                      display: this.state.isEmailProgress ? "flex" : "none"
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.editText,
                    styles.labelName,
                    { fontFamily: "OpenSans-SemiBold" }
                  ]}
                >
                  EMAIL ADDRESS
                </Text>
              </View>
              <ProgressCompoment isProgress={this.state.isProgress} />
              <View style={{ marginTop: 15 }}>
                <TouchableOpacity
                  onPress={this._showDateTimePicker}
                  style={[
                    styles.editText,
                    {
                      borderBottomColor: Colors.colorEdittext,
                      borderBottomWidth: 1,
                      paddingBottom: 5
                    }
                  ]}
                >
                  <Text
                    ref={"bdate"}
                    style={{
                      color: Colors.colorEdittext,
                      fontFamily: "OpenSans-Bold",
                      fontSize: 18
                    }}
                    editable={false}
                    placeholder={"DATE OF BIRTH"}
                    placeholderTextColor={Colors.colorEdittext}
                    underlineColorAndroid={Colors.transparent}
                  >
                    {this.state.dateOfBirth}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.editText,
                    styles.labelName,
                    { fontFamily: "OpenSans-SemiBold" }
                  ]}
                >
                  DATE OF BIRTH
                </Text>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  maximumDate={new Date()}
                  onCancel={this._hideDateTimePicker}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.doChangeGender("male")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isMaleActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: Colors.bgHeader,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isMaleActive
                          ? Colors.white
                          : Colors.bgHeader
                      }}
                    >
                      MALE
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, marginStart: 8, marginEnd: 8 }}
                  onPress={() => this.doChangeGender("female")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isFemaleActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: Colors.bgHeader,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isFemaleActive
                          ? Colors.white
                          : Colors.bgHeader
                      }}
                    >
                      FEMALE
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.doChangeGender("other")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isOtherActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: Colors.bgHeader,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isOtherActive
                          ? Colors.white
                          : Colors.bgHeader
                      }}
                    >
                      OTHER
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  borderBottomColor: Colors.colorEdittext,
                  borderBottomWidth: 1
                }}
              >
                <TextInput
                  ref={"password"}
                  onChangeText={password =>
                    this.setState({ password: password })
                  }
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
                      this.state.showPassword
                        ? Icons.ic_show_pw
                        : Icons.ic_hide_pw
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
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}
            >
              <TouchableOpacity onPress={this.doBack.bind(this)}>
                <View style={styles.buttonLogin}>
                  <Text style={styles.buttonText}>BACK</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUpScreen2")}>
                <View style={styles.buttonSignUp}>
                  <Text style={[styles.buttonText, { color: Colors.white }]}>
                    NEXT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  logo: { marginTop: 20, marginLeft: "5%", height: 100, width: 152 },
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
  },
  labelName: { fontSize: 14, marginTop: 5 },
  editText: { color: Colors.colorEdittext, fontSize: 18, padding: 0 },
  buttonLogin: {
    marginRight: 5,
    width: Dimensions.get("screen").width / 2,
    borderColor: Colors.bgHeader,
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
    borderColor: Colors.bgHeader,
    backgroundColor: Colors.bgHeader,
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
    color: Colors.bgHeader,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 20,
    marginBottom: 20
  }
});
export default SignUpScreen1;
