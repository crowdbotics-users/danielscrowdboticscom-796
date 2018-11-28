import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,NetInfo,Alert,AsyncStorage
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { NavigationActions, StackActions } from "react-navigation";
import ApiUrl from "../Network/ApiUrl";

class OneTimePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onetimepassword: "",
      isProgress: false
    };
  }
  static navigationOptions = {
    header: null
  };
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  //redirect home page

  doLogin(screen) {
    const { navigate } = this.props.navigation;
    const { data } = this.props.navigation.state.params;

    if (this.state.onetimepassword == "") {
      alert("Enter One-Time Password");
      this.refs.onetimepassword.focus();
    } else if ((this.state.onetimepassword.length < 4)) {
      alert("Enter Valid One-Time Password");
      this.refs.onetimepassword.focus();
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          const bodyData = JSON.stringify({
            otp: this.state.onetimepassword,
            user_id: data.id,
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
    fetch(ApiUrl.otpCheckUrl, {
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
            const data = {
              id: result.id,
              email: result.email,
              full_name: result.full_name,
              profile_image: result.profile_image,
            };
  
            this.doRedirect(screen,data);
            break;
          }
          case 401: {
            
            alert(message);

            break;
          }
          case 400: {
         
            // alert(message);
            const result = responseJson.result;
            const data = {
              id: result.id,
              email: result.email,
              full_name: result.full_name,
              profile_image: result.profile_image,
            };
  
            this.doRedirect(screen,data);
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
      });
  }
  doRedirect(screen,data) {
    const { navigate } = this.props.navigation;
    navigate(screen,{data:data});
  }
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  doBack() {
    this.props.navigation.goBack(null);
  }

  render() {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.logo} />
        </View>
        <View style={styles.textField}>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 13,
              marginTop: 5,
              color: Colors.colorEdittext
            }}
          >
            ENTER YOUR 4 OR 6 CHARACTERS
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 13,

              color: Colors.colorEdittext
            }}
          >
            ONE-TIME PASSWORD
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 13,
              marginTop: 5,
              color: Colors.colorSearch
            }}
          >
            ONE-TIME PASSWORD
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 13,

              color: Colors.colorSearch
            }}
          >
            WILL EXPIRE AFTER 15 MINUTES!
          </Text>
          <View style={{ marginTop: 40, marginBottom: 100 }}>
            <TextInput
              ref={"onetimepassword"}
              onChangeText={onetimepassword =>
                this.setState({ onetimepassword: onetimepassword })
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
              maxLength={6}
              value={this.state.onetimepassword}
              secureTextEntry={true}
              keyboardType="ascii-capable"
              placeholder={"ONE-TIME PASSWORD"}
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
              ONE-TIME PASSWORD
            </Text>
          </View>
          <ProgressCompoment isProgress={this.state.isProgress} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30
          }}
        >
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => this.doBack()}>
              <View style={styles.backbutton}>
                <Text
                  style={[
                    styles.backbuttonText,
                    { fontFamily: "JosefinSans-Bold" }
                  ]}
                >
                  BACK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => this.doLogin("UpdatePasswordScreen")}
            >
              <View style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
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
  logo: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginStart: "10%"
  },
  logoImage: { height: 100, width: 152 },
  textField: {
    flex: 1,
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center"
  },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext },
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
  backbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.bgHeader
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  editText: { color: Colors.colorEdittext, fontSize: 18, padding: 0 }
});
export default OneTimePasswordScreen;
