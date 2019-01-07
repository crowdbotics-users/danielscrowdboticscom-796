import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  AsyncStorage,
  NetInfo,
  Platform
} from "react-native";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ImagePicker from "react-native-image-crop-picker";
import ProgressCompoment from "../../Compoments/ProgressCompoment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../../Network/ApiUrl";
import { NavigationActions, StackActions } from "react-navigation";

class SignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: "",
      isProgress: false
    };
  }
  static navigationOptions = {
    header: null
  };
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          avatarSource: image.path
        });
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null
        });
      })
      .catch(e => {
        console.log("pickSingleWithCamera", e);
      });
  }
  pickSingle(cropit, circular = true) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          avatarSource: image.path
        });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log("pickSingle", e);
      });
  }
  doBack() {
    this.props.navigation.goBack();
  }
  doRedirect(screen) {
    
    const { userData } = this.props.navigation.state.params;
    console.log(userData);

    if (this.state.avatarSource == "") {
      alert("Select Picture");
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("token")
            .then(data => {
              console.log("AsyncStorage");
              if (data != null) {
                console.log(data);
                const bodyData = new FormData();
                bodyData.append("profile_image", {
                  uri: this.state.avatarSource,
                  type: "image/jpeg",
                  name: "image1"
                });
                bodyData.append("full_name", userData.name);
                bodyData.append("email", userData.email);
                bodyData.append("password", userData.password);
                bodyData.append("dob", userData.bdate);
                bodyData.append("device_type", Platform.OS);
                bodyData.append("fire_base_token", data);
                bodyData.append("user_name", userData.name);
                bodyData.append("gender", userData.gender);
                this.openProgressbar();
                this.doRegisterApi(bodyData, screen);
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
  doRegisterApi(bodyData, screen) {
    const { navigate } = this.props.navigation;
    fetch(ApiUrl.registerUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
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
            this.doFinish(screen);
            break;
          }
          case 401: {
            this.hideProgressbar();
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
          case 400: {
            this.hideProgressbar();
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
      });
  }
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  doShowSnackBar(message) {
    showSnackBar({
      message: message,
      position: 'top',
      backgroundColor: Colors.bgHeader,
      buttonColor: "#fff",
      confirmText: '',
      onConfirm: () => { },
      duration: 1000
    });
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            resizeMethod="auto"
            source={Icons.logo}
          />
          <View style={styles.uploadView}>
            <View style={styles.customUploadView}>
              <View style={styles.uploadImageView}>
                <ImageBackground
                  style={{ height: 180, width: 180, justifyContent: "center" }}
                  source={Icons.ic_upload_image_bg}
                >
                  <Image
                    source={{ uri: this.state.avatarSource }}
                    style={{
                      height: 170,
                      width: 170,
                      borderRadius: 85,
                      alignSelf: "center"
                    }}
                  />
                </ImageBackground>
              </View>
              <View>
                <Text style={[styles.text, { marginTop: 10 }]}>
                  CHOOSE YOUR PROFILE PICTURE
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.uploadTypeSelectView}>
            <ProgressCompoment isProgress={this.state.isProgress} />
            <TouchableOpacity onPress={() => this.pickSingle(true)} style={{flex:1,alignItems: "center"}}>
              <View style={styles.galleryView}>
                <Image
                  style={{ height: 60, width: 60 }}
                  source={Icons.ic_upload_image}
                />
                <Text style={styles.text}>UPLOAD</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={{flex:1,alignItems: "center"}}>
              <View style={styles.cameraView}>
                <Image
                  style={{ height: 60, width: 60, alignItems: "center" }}
                  source={Icons.ic_camera}
                />
                <Text style={styles.text}>TAKE A PICTURE</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 5
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
              <TouchableOpacity onPress={this.doRedirect.bind(this, "LoginType")}>
                <View style={styles.button}>
                  <Text
                    style={[
                      styles.nextbuttonText,
                      { fontFamily: "JosefinSans-Bold" }
                    ]}
                  >
                    DONE!
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
  logo: { marginTop: 20, marginLeft: "5%", height: 100, width: 152 },
  uploadView: {
    flex: 2,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadImageView: {
    alignItems: "center",
    justifyContent: "center"
  },
  customUploadView: {
    flexDirection: "column",
    justifyContent: "center"
  },
  uploadTypeSelectView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: { flex: 1, justifyContent: "flex-end", alignItems: "flex-end" },
  
  
  
  
  galleryView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  },
  cameraView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  
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
  nextbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  text: {
    color: Colors.colorEdittext,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "OpenSans-SemiBold"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.bgHeader
  }
});
export default SignUpScreen2;
