import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  NetInfo,
  AsyncStorage,
  Alert,SafeAreaView
} from "react-native";
import AddPostHeaderCompoment from "../Compoments/AddPostHeaderCompoment";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import ImagePicker from "react-native-image-crop-picker";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import ApiUrl from "../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";

class AddPostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: "",
      isProgress: false,
      postImage: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => <AddPostHeaderCompoment {...props} props={navigation} />
    };
  };
  pickSingleWithCamera(cropping, circular = false) {
    ImagePicker.openCamera({
      cropping: false,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          postImage: image.path
        });
      })
      .catch(e => alert(e));
  }
  doAddPost() {
    if (this.state.messages == "") {
      this.refs.messages.focus();
      alert("Write a post");
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("data")
            .then(data => {
              console.log("AsyncStorage");
              if (data != null) {
                const myData = JSON.parse(data);
                const bodyData = new FormData();
                if (this.state.postImage != "") {
                  bodyData.append("post_image", {
                    uri: this.state.postImage,
                    type: "image/jpeg",
                    name: "image1"
                  });
                }

                bodyData.append("description", this.state.messages);

                this.openProgressbar();
                this.doAddPostApi(bodyData, myData.token);
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
  doAddPostApi(bodyData, token) {
    fetch(ApiUrl.addPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
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
            this.doShowSnackBar(message);
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
        alert(error);
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
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <View
          style={{ position: "relative", flex: 1, flexDirection: "column" }}
        >
          <View style={{ position: "relative" }}>
            <View
              style={[
                styles.row,
                { marginStart: 10, marginEnd: 10, alignItems: "center" }
              ]}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F8F6F7",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <Image
                  source={Icons.messi}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    borderWidth: 1.5,
                    borderColor: "#D1D0D0",
                    alignSelf: "center"
                  }}
                />
              </View>

              <Text
                style={{
                  marginStart: 10,
                  color: Colors.black,
                  fontFamily: "OpenSans-Bold"
                }}
              >
                JOHN SCHOFFER
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: Colors.colorLine,
                borderBottomWidth: 1
              }}
            />
            <TextInput
              ref={"messages"}
              placeholder="Write a post,share link or picture..."
              style={{ marginStart: 10, marginEnd: 10 }}
              underlineColorAndroid={Colors.transparent}
              value={this.state.messages}
              onChangeText={text => {
                this.setState({ messages: text });
              }}
            />
            <Image source={this.state.postImage!=""?{uri:this.state.postImage}:""} />
            <ProgressCompoment isProgress={this.state.isProgress} />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flex: 1,
              borderTopColor: Colors.colorLine,
              width: "100%",
              borderTopWidth: 1,
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.row,
                {
                  marginStart: 10,
                  marginEnd: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 10
                }
              ]}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold",
                    marginEnd: 10,
                    fontSize: 16
                  }}
                >
                  @
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold",
                    marginEnd: 10,
                    fontSize: 16
                  }}
                >
                  #
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.pickSingleWithCamera(true, true)}
              >
                <Image
                  source={Icons.ic_camera_profile}
                  style={[styles.icon, {}]}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => this.doAddPost()}>
                <View
                  style={{
                    backgroundColor: Colors.bgHeader,
                    borderRadius: 5
                  }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      padding: 5,
                      fontFamily: "OpenSans-Bold",
                      marginStart: 10,
                      marginEnd: 10
                    }}
                  >
                    Post
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
    );
  }
}

export default AddPostScreen;
