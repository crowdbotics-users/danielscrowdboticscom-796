import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NetInfo,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../Network/ApiUrl";

class SignUpScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      EmailAddress: "",
      dateOfBirth: "DATE OF BIRTH",
      isDateTimePickerVisible: false,
      isAlreadyEmailExit: false,
      isProgress: false,
      postDob: ""
    };
    Moment.locale();
  }
  static navigationOptions = {
    header: null
  };

  //redirect home page

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
      alert("Select Birthdate");
    } else {
      const userData1 = {
        name: this.state.fullName,
        email: this.state.EmailAddress,
        bdate: this.state.postDob
      };

      navigate(screen, { userData1: userData1 });
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
this.setState({isProgress:true});
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

            this.setState({ isAlreadyEmailExit: false ,isProgress:false});
            break;
          }
          case 401: {
            this.setState({ isAlreadyEmailExit: true,isProgress:false });
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
          case 400: {
            this.setState({ isAlreadyEmailExit: true ,isProgress:false});
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
  doBack() {
    this.props.navigation.goBack();
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ dateOfBirth: Moment(date).format("DD/MM/YYYY") });
    this.setState({ postDob: Moment(date).format("YYYY-MM-DD") });
    this._hideDateTimePicker();
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              resizeMethod="auto"
              source={Icons.logo}
            />
          </View>
          <View style={styles.textField}>
            <View>
              <TextInput
                ref={"name"}
                onChangeText={fullName => this.setState({ fullName: fullName })}
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

            <View style={{ marginTop: "10%" }}>
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
                  autoCapitalize = 'none'
                  returnKeyType="done"
                />
                <ActivityIndicator color={Colors.bgHeader} style={{display:this.state.isProgress?'flex':'none'}}/>
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

            <View style={{ marginTop: "10%" }}>
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30
            }}
          >
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.doBack.bind(this)}>
                <View style={styles.backbutton}>
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "JosefinSans-Bold" }
                    ]}
                  >
                    BACK
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp2")}>
                <View style={styles.button}>
                  <Text
                    style={[
                      styles.nextbuttonText,
                      { fontFamily: "JosefinSans-Bold" }
                    ]}
                  >
                    NEXT
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
  logo: { marginTop: 50, marginLeft: "10%" },
  logoImage: { height: 100, width: 152 },
  textField: {
    flex: 1,
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center"
  },
  labelName: { fontSize: 14, marginTop: 5 },
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
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.bgHeader
  },
  nextbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  editText: { color: Colors.colorEdittext, fontSize: 18, padding: 0 }
});
export default SignUpScreen1;
