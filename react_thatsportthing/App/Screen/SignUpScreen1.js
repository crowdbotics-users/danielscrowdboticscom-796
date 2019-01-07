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
 
});
export default SignUpScreen1;
