import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListView,
  SafeAreaView,
  NetInfo,
  Alert
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
import ApiUrl from "../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class UpdatePasswordScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      cpassword: "",
      isProgress: false,
      profile_image: "",
      full_name: ""
    };
  }
  componentWillMount() {
    const { data } = this.props.navigation.state.params;

    this.setState({
      full_name: data.full_name,
      profile_image: data.profile_image
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
  doBack() {
    this.props.navigation.goBack();
  }
  doForgot(screen) {
    const { navigate } = this.props.navigation;
    const { data } = this.props.navigation.state.params;
    if (this.state.password == "") {
      alert("Enter Password");
      this.refs.password.focus();
    } else if (this.state.cpassword == "") {
      this.refs.cpassword.focus();
      alert("Enter Confirm Password");
    } else if (this.state.password != this.state.cpassword) {
      this.refs.cpassword.focus();
      alert("Password does not match");
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          const bodyData = JSON.stringify({
            email: data.email,
            password: this.state.password,
            confirm_password: this.state.cpassword
          });

          this.openProgressbar();
          this.doForgotApi(bodyData, screen);
        } else {
          Alert.alert(
            "Internet Connection",
            "Kindly connect to internet then try again"
          );
        }
      });
    }
  }
  doForgotApi(bodyData, screen) {
    const { navigate } = this.props.navigation;
    fetch(ApiUrl.updatePasswordUrl, {
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
            const result = responseJson.result;
            this.doFinish(screen);
            break;
          }
          case 401: {
            this.doShowSnackBar(message);

            break;
          }
          case 400: {
            this.doShowSnackBar(message);

            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
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
  render() {
    return (
      <SafeAreaView>
        <View style={customstyles.container}>
          <View style={customstyles.logo}>
            <Image style={customstyles.logoImage} source={Icons.logo} />
          </View>
          <View
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: 20,
              flex: 1,
              height: "100%"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "flex-start"
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: "#F8F6F7",

                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <Image
                    source={
                      this.state.profile_image == ""
                        ? Icons.messi
                        : { uri: this.state.profile_image }
                    }
                    style={{
                      width: 98,
                      height: 98,
                      borderRadius: 49,
                      borderWidth: 1.5,
                      borderColor: Colors.colorEdittext,
                      alignSelf: "center"
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignContent: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 14,
                    color: Colors.colorEdittext
                  }}
                >
                  HI, {this.state.full_name}!
                </Text>
                <Text
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 13,
                    color: Colors.colorSearch
                  }}
                >
                  WE ARE GLAD TO
                </Text>
                <Text
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 13,
                    color: Colors.colorSearch
                  }}
                >
                  SEE YOU AGAIN!
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginTop: 20,
                fontFamily: "OpenSans-Bold",
                fontSize: 14,
                color: Colors.colorEdittext
              }}
            >
              PLEASE RESET YOUR PASSWORD!
            </Text>
            <View style={{ marginTop: 20 }}>
              <TextInput
                ref={"password"}
                onChangeText={password => this.setState({ password: password })}
                style={[
                  customstyles.editText,
                  {
                    fontFamily: "OpenSans-Bold",
                    borderBottomColor: Colors.colorEdittext,
                    borderBottomWidth: 1,
                    paddingBottom: 5
                  }
                ]}
                secureTextEntry={true}
                value={this.state.password}
                keyboardType="ascii-capable"
                placeholder={"NEW PASSWORD"}
                placeholderTextColor={Colors.colorEdittext}
                selectionColor={Colors.colorEdittext}
                underlineColorAndroid={Colors.transparent}
                returnKeyType="next"
              />
              <Text
                style={[
                  customstyles.editText,
                  customstyles.labelName,
                  { fontFamily: "OpenSans-SemiBold" }
                ]}
              >
                ENTER YOUR NEW PASSWORD
              </Text>
            </View>
            <ProgressCompoment isProgress={this.state.isProgress} />
            <View style={{ marginTop: 30, flex: 0.8 }}>
              <TextInput
                ref={"cpassword"}
                onChangeText={cpassword =>
                  this.setState({ cpassword: cpassword })
                }
                style={[
                  customstyles.editText,
                  {
                    fontFamily: "OpenSans-Bold",
                    borderBottomColor: Colors.colorEdittext,
                    borderBottomWidth: 1,
                    paddingBottom: 5
                  }
                ]}
                secureTextEntry={true}
                value={this.state.cpassword}
                keyboardType="ascii-capable"
                placeholder={"CONFIRM PASSWORD"}
                placeholderTextColor={Colors.colorEdittext}
                selectionColor={Colors.colorEdittext}
                underlineColorAndroid={Colors.transparent}
                returnKeyType="done"
              />
              <Text
                style={[
                  customstyles.editText,
                  customstyles.labelName,
                  { fontFamily: "OpenSans-SemiBold" }
                ]}
              >
                CONFIRM YOUR NEW PASSWORD
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.doForgot("LoginType")}
              style={{ flex: 0.35 }}
            >
              <View
                style={{
                  alignContent: "flex-end",
                  backgroundColor: Colors.bgHeader,
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 16,
                    color: Colors.white,
                    paddingTop: 20,
                    paddingBottom: 20
                  }}
                >
                  SAVE AND LOGIN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.doBack()}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 13,
                    color: Colors.red,
                    paddingTop: 15,
                    paddingBottom: 15
                  }}
                >
                  X
                </Text>
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 13,
                    color: Colors.colorEdittext,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginStart: 5
                  }}
                >
                  CANCEL
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const customstyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: "100%",
    flexDirection: "column"
  },
  logo: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginStart: "10%"
  },
  logoImage: { height: 100, width: 152 },
  editText: { color: Colors.colorEdittext, fontSize: 14, padding: 0 },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext }
});
export default UpdatePasswordScreen;
