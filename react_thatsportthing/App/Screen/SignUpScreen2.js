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

class SignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      cpassword: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  //redirect home page

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    const { userData1 } = this.props.navigation.state.params;
    if (this.state.userName == "") {
      this.refs.username.focus();
      alert("Enter User Name");
    } else if (this.state.password == "") {
      this.refs.password.focus();
      alert("Enter Password");
    }else if (this.state.cpassword == "") {
      this.refs.cpassword.focus();
      alert("Enter Confirm Password");
    }else if(this.state.password!=this.state.cpassword){
      this.refs.cpassword.focus();
      alert("Password does not match");
    }else{
      const userData2={
        name:userData1.name,
        email:userData1.email,
        bdate:userData1.bdate,
        username:this.state.userName,
        password:this.state.password,
        cpassword:this.state.cpassword,
      }
      navigate(screen, { userData2: userData2 });
    }
  }
  doBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.logo} />
        </View>
        <View style={styles.textField}>
          <View>
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
              keyboardType="ascii-capable"
              placeholder={"User name"}
              placeholderTextColor={Colors.colorEdittext}
              selectionColor={Colors.colorEdittext}
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
              USERNAME
            </Text>
          </View>

          <View style={{ marginTop: "10%" }}>
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
              value={this.state.password}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={Colors.colorEdittext}
              selectionColor={Colors.colorEdittext}
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
              PASSWORD
            </Text>
          </View>

          <View style={{ marginTop: "10%" }}>
            <TextInput
            ref={"cpassword"}
              onChangeText={ConfirmPassword =>
                this.setState({ cpassword: ConfirmPassword })
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
              value={this.state.cpassword}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Confirm Password"}
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
              CONFIRM PASSWORD
            </Text>
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
            <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp3")}>
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
  logo: { marginTop: 50,marginLeft:"10%" },
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
    marginRight:10,
    borderWidth:1,
    width:Dimensions.get('screen').width/2,
    borderColor:Colors.bgHeader,
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
  editText: { color: Colors.colorEdittext, fontSize: 18,padding:0 }
});
export default SignUpScreen2;
