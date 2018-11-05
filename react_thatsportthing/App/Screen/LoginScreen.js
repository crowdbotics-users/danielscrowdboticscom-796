import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }
  static navigationOptions = {
    header: null
  };
 
  //redirect home page
  doLogin() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doBack(){
    this.props.navigation.goBack();
  }

  render() {
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.logo_white} />
        </View>
        <View style={styles.textField}>
          <View style={{marginBottom:10}}>
            <TextInput
              onChangeText={username => this.setState({ userName: username })}
              style={[
                styles.editText,
                {
                  fontFamily:'OpenSans-Bold',
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="email-address"
              placeholder={"User name"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.transparent}
            />
            <Text style={[styles.editText, styles.labelName,{fontFamily:'OpenSans-SemiBold',}]}>USERNAME</Text>
          </View>

          <View>
            <TextInput
              onChangeText={password => this.setState({ password: password })}
              style={[
                styles.editText,
                {
                  fontFamily:'OpenSans-Bold',
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
          </View>
          <Text style={[styles.editText, styles.labelName,{fontFamily:'OpenSans-SemiBold'}]}>PASSWORD</Text>
        </View>

         <View style={{ flexDirection: "row", justifyContent: "center",marginBottom:30 }}>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doBack.bind(this)}>
              <View style={styles.backbutton}>
                <Text style={[styles.backbuttonText,{fontFamily:'JosefinSans-Bold'}]}>BACK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doRedirect.bind(this,'HomePage')}>
              <View style={styles.button}>
                <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>LOGIN</Text>
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
    backgroundColor: Colors.backgroundLogin,
    flex: 1
  },
  logo: {  marginTop:80,justifyContent: "center", alignItems: "center" },
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
    marginLeft:10,
   width:Dimensions.get('screen').width/2,
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
  backbuttonText: {
    textAlign:'center',
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  buttonText: {
    textAlign:'center',
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.backgroundLogin
  }
  ,
  editText: { color: Colors.white, fontSize: 18 }
});
export default LoginScreen;
