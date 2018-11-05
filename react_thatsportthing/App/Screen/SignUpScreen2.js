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

class SignUpScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      EmailAddress: "",
      dateOfBirth: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  //redirect home page

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.logo_white} />
        </View>
        <View style={styles.textField}>
          <View>
            <TextInput
              onChangeText={username => this.setState({ userName: username })}
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="ascii-capable"
              placeholder={"User name"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.white}
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
              onChangeText={password => this.setState({ password: password })}
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.white}
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
              onChangeText={ConfirmPassword =>
                this.setState({ ConfirmPassword: ConfirmPassword })
              }
              style={[
                styles.editText,
                {
                  fontFamily: "OpenSans-Bold",
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Confirm Password"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.transparent}
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
    backgroundColor: Colors.orange,
    flex: 1
  },
  logo: { marginTop: 50,marginLeft:30 },
  logoImage: { height: 90, width: 137 },
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
    backgroundColor: Colors.white,
    marginLeft: 10,
    width: Dimensions.get("screen").width / 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  backbutton: {
    marginBottom: "10%",
    marginRight:10,
    borderWidth:2,
    width:Dimensions.get('screen').width/2,
    borderColor:Colors.white,
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
    color: Colors.white
  },
  nextbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.orange
  },
  editText: { color: Colors.white, fontSize: 18 }
});
export default SignUpScreen1;
