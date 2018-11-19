import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
class SignUpScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      EmailAddress: "",
      dateOfBirth: "DATE OF BIRTH",
      isDateTimePickerVisible: false,
      isDateTimePickerVisible: false
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
    }else if (!this.doValidEmail(this.state.EmailAddress)) {
      this.refs.email.focus();
      alert("Enter Valid Email Address");
    }else if(this.state.dateOfBirth=="DATE OF BIRTH" || this.state.dateOfBirth==""){
      this.refs.bdate.focus();
      alert("Select Birthdate");
    }else{
      const userData1 = {
        name: this.state.fullName,
        email: this.state.EmailAddress,
        bdate: this.state.dateOfBirth
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
  doBack() {
    this.props.navigation.goBack();
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ dateOfBirth: Moment(date).format("DD/MM/YYYY") });
    this._hideDateTimePicker();
  };
  render() {
    return (
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
              keyboardType="ascii-capable"
              placeholder={"FULL NAME"}
              placeholderTextColor={Colors.colorEdittext}
              selectionColor={Colors.colorEdittext}
              underlineColorAndroid={Colors.transparent}
              returnKeyType='next'
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
            <TextInput
             ref={"email"}
              onChangeText={EmailAddress =>
                this.setState({ EmailAddress: EmailAddress })
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
              keyboardType="email-address"
              placeholder={"EMAIL ADDRESS"}
              placeholderTextColor={Colors.colorEdittext}
              selectionColor={Colors.colorEdittext}
              underlineColorAndroid={Colors.transparent}
              returnKeyType='done'
            />
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
                selectionColor={Colors.colorEdittext}
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
