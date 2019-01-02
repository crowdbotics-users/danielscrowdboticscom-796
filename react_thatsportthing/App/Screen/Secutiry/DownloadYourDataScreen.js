import React, { PureComponent } from "react";

import {
  View,
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  NetInfo,
  Alert,
  Image,
  ScrollView
} from "react-native";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Icons from "../../Resource/Icons";
import Colors from "../../Resource/Colors";
import ProgressCompoment from "../../Compoments/ProgressCompoment";
import ApiUrl from "../../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
class DownloadYourDataScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent
          {...props}
          props={navigation}
          title="DOWNLOAD YOUR DATA"
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      header: "Get a Copy of What You've Shared on That Sports Thing App",
      body:
        "We will email you a link to a file with all your photos, comments, profile information and more. It may take up to 48 hours to collect this data and send it to you.",
      email: "",
      isProgress: false
    };
  }
  doRequest() {
    if (this.state.email == "") {
      alert("Enter Email");
      this.refs.email.focus();
    } else if (!this.doValidEmail(this.state.email)) {
      alert("Enter Valid Email");
      this.refs.email.focus();
    }else{
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          const bodyData = JSON.stringify({
            email: this.state.email
          });

          this.openProgressbar();
          this.doRequestApi(bodyData);
        } else {
          Alert.alert(
            "Internet Connection",
            "Kindly connect to internet then try again"
          );
        }
      });
    }
  }
  doRequestApi(bodyData) {
    const { navigate } = this.props.navigation;
    fetch(ApiUrl.requestDownload, {
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
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
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
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        
          <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Image
              source={Icons.ic_download_data}
              style={{
                width: 180,
                height: 180,
                alignSelf: "center",
                margin: 15
              }}
            />
            <Text
              style={{
                color: Colors.colorEdittext,
                textAlign: "center",
                fontSize: 16,
                fontFamily: "OpenSans-Bold",
                margin: 15
              }}
            >
              {this.state.header}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontFamily: "OpenSans-SemiBold",
                margin: 15
              }}
            >
              {this.state.body}
            </Text>
            <View style={{  marginTop: '5%',
                  marginLeft: '8%',
                  marginRight: '8%' }}>
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
                placeholder={"EMAIL"}
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
                YOUR E-MAIL
              </Text>
            </View>
            <ProgressCompoment isProgress={this.state.isProgress} />
            <TouchableOpacity onPress={() => this.doRequest()}>
              <View
                style={{
                  alignContent: "flex-end",
                  backgroundColor: Colors.bgHeader,
                  alignItems: "center",
                  borderRadius: 15,
                  marginTop: '12%',
                  marginLeft: '15%',
                  marginRight: '15%'
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
                  REQUEST DOWNLOAD
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
export default DownloadYourDataScreen;
