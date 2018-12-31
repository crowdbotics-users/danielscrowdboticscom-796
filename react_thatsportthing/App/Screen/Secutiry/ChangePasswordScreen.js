import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  NetInfo,
  Alert
} from "react-native";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../../Network/ApiUrl";

import Colors from "../../Resource/Colors";
import ProgressCompoment from "../../Compoments/ProgressCompoment";

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent {...props} props={navigation} title="PASSWORD" />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      current_password: "",
      password: "",
      cpassword: "",
      isProgress: false
    };
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
  componentDidMount() {
    this.doGetUserInfo();
  }
  doGetUserInfo() {
    AsyncStorage.getItem("data")
      .then(data => {
        if (data != null) {
          const myData = JSON.parse(data);
          this.setState({
            email: myData.email
          });
        } else {
        }
      })
      .done();
  }
  doForgot() {
    const { navigate } = this.props.navigation;
    if (this.state.email == "") {
      alert("Enter Email");
      this.refs.email.focus();
    } else if (this.state.current_password == "") {
      alert("Enter Current Password");
      this.refs.current_password.focus();
    } else if (this.state.password == "") {
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
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.cpassword
          });

          this.openProgressbar();
          this.doForgotApi(bodyData);
        } else {
          Alert.alert(
            "Internet Connection",
            "Kindly connect to internet then try again"
          );
        }
      });
    }
  }
  doForgotApi(bodyData) {
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
            console.log(message);
            this.doShowSnackBar(message);

            Alert.alert(
              "",
              message,
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    this.props.navigation.goBack(null);
                  }
                },
                {
                  text: "OK",
                  onPress: () => {
                    this.props.navigation.goBack(null);
                  }
                }
              ],
              { cancelable: false }
            );

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
      <SafeAreaView style={customstyles.container}>
        <View
          style={[
            customstyles.container,
            { marginLeft: "5%", marginRight: "5%" }
          ]}
        >
          <View style={{ marginTop: 20 ,display:'none'}}>
            <TextInput
              ref={"email"}
              onChangeText={email => this.setState({ email: password })}
              style={[
                customstyles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.colorEdittext,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              editable={false}
              value={this.state.email}
              keyboardType="email-address"
              placeholder={"EMAIL"}
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
              ENTER YOUR EMAIL ADDRESS
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              ref={"current_password"}
              onChangeText={password =>
                this.setState({ current_password: password })
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
              value={this.state.current_password}
              keyboardType="ascii-capable"
              placeholder={"CURRENT PASSWORD"}
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
              ENTER YOUR CURRENT PASSWORD
            </Text>
          </View>
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
          <View style={{ marginTop: 30 }}>
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
          <TouchableOpacity onPress={() => this.doForgot("LoginType")}>
            <View
              style={{
                alignContent: "flex-end",
                backgroundColor: Colors.bgHeader,
                alignItems: "center",
                borderRadius: 15,
                marginTop: "10%"
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
                SAVE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const customstyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  editText: { color: Colors.colorEdittext, fontSize: 14, padding: 0 },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext }
});
export default ChangePasswordScreen;
