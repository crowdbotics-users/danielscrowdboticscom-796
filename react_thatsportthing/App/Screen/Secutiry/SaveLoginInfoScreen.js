import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Switch,
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

class SaveLoginInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent
          {...props}
          props={navigation}
          title="SAVE LOGIN INFO"
        />
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
      isProgress: false,
      toggled: false
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
            { marginLeft: "5%", marginRight: "5%",marginTop:'5%' }
          ]}
        >
        <ProgressCompoment isProgress={this.state.isProgress}/>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                customstyles.labelName,
                { fontFamily: "OpenSans-Bold", flex: 1 }
              ]}
            >
              Private Account
            </Text>
            <Switch
               onValueChange={ (value) => this.setState({ toggled: value })} 
               value={ this.state.toggled } 
            />
          </View>
          <Text
          style={[
            customstyles.labelName,
            { fontFamily: "OpenSans-SemiBold", flex: 1 }
          ]}
        >
          We will remember your account info for you on this device. You don't
          need to enter it when you log in again.
        </Text>
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
  labelName: { color: Colors.colorEdittext, fontSize: 14, marginTop: 5 }
});
export default SaveLoginInfoScreen;
