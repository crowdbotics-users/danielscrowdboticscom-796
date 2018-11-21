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
  ImageBackground,
  ListView,
  Platform,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isProgress: false
    };
  }
  doBack(){
    this.props.navigation.goBack();
  }
  doForgot(screen){
    const {navigate}=this.props.navigation;
    if (this.state.email == "") {
      alert("Enter Email");
      this.refs.email.focus();
    }else if (!this.doValidEmail(this.state.email)) {
      this.refs.email.focus();
      alert("Enter Valid Email Address");
    }else {
      this.openProgressbar();
      setTimeout(() => {
        this.hideProgressbar();
        navigate(screen);
      }, 500);
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
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginTop: 5,
                color: Colors.colorEdittext
              }}
            >
              ENTER YOUR EMAIL
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,

                color: Colors.colorEdittext
              }}
            >
              TO RESET YOUR PASSWORD
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginTop: 5,
                color: Colors.colorSearch
              }}
            >
              YOU WILL GOT AN ONE-TIME PASSWORD WHICH
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,

                color: Colors.colorSearch
              }}
            >
              WILL EXPIRE AFTER 15 MINUTES.
            </Text>
            <View style={{ marginTop: 40, flex:1 }}>
              <TextInput
                ref={"email"}
                onChangeText={email => this.setState({ email: email })}
                style={[
                  customstyles.editText,
                  {
                    fontFamily: "OpenSans-Bold",
                    borderBottomColor: Colors.colorEdittext,
                    borderBottomWidth: 1,
                    paddingBottom: 5
                  }
                ]}
                value={this.state.email}
                keyboardType="email-address"
                placeholder={"YOUR E-MAIL"}
                placeholderTextColor={Colors.colorEdittext}
                selectionColor={Colors.colorEdittext}
                underlineColorAndroid={Colors.transparent}
                returnKeyType="done"
              />
              <Text
                style={[
                  styles.editText,
                  styles.labelName,
                  { fontFamily: "OpenSans-SemiBold" }
                ]}
              >
                YOUR E-MAIL
              </Text>
            </View>
            <ProgressCompoment isProgress={this.state.isProgress} />

            <TouchableOpacity onPress={()=>this.doForgot('OneTimePasswordScreen')} style={{flex:0.25}}>
              <View
                style={{
                  alignContent: "flex-end",
                  backgroundColor: Colors.bgHeader,
                  alignItems: "center",
                  borderRadius: 10,
                
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
                  RESET YOUR PASSWORD
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.doBack()}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 10,
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
export default ForgotPasswordScreen;
