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
  Alert,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";
import AddPostHeaderCompoment from "../Compoments/AddPostHeaderCompoment";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import ImagePicker from "react-native-image-crop-picker";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import ApiUrl from "../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import RNPickerSelect from "react-native-picker-select";

class AddPostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      full_name:'',
      profile_image:'',
      messages: "",
      isProgress: false,
      postImage: "",
      privacy: "all",
      items: [
        {
          label: "Public",
          value: "all"
        },
        {
          label: "Crew",
          value: "crew"
        }
      ]
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
        console.log("received image", image.path);
        this.setState({
          postImage: image.path
        });
      })
      .catch(e => alert(e));
  }
  doGetUserInfo() {
    AsyncStorage.getItem("data")
      .then(data => {
        if (data != null) {
          const myData = JSON.parse(data);
          this.setState({
            full_name: myData.full_name,
            profile_image: myData.profile_image,
            cover_image: myData.cover_image,
            post_status: myData.post_status,
            follower_count: myData.follower_count,
            crew_count: myData.crew_count,
            post_count: myData.post_count,
            user_name: myData.user_name
          });
        } else {
        }
      })
      .done();
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
                bodyData.append("post_status", this.state.privacy);
console.log(bodyData);

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
  componentDidMount(){
    this.doGetUserInfo();
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
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
          <View
            style={{
              position: "relative",
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={{ position: "relative",  flex: 1 }}
            >
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
                    source={this.state.profile_image==""?Icons.messi:{uri:this.state.profile_image}}
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
                    flex: 1,
                    marginStart: 10,
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold"
                  }}
                >
                  {this.state.full_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: Colors.colorSearch,
                    borderWidth: 1,
                    alignSelf: "center",
                    padding: 0,
                    borderRadius: 4
                  }}
                >
                  <Image
                    source={Icons.ic_world}
                    style={{ width: 15, height: 15, margin: 5, marginEnd: 10 }}
                  />
                  <View
                    style={{
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center",
                      padding: 0,
                      margin: 0,
                      top: 0,
                      bottom: 0
                    }}
                  >
                    <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      placeholder={{}}
                      hideIcon={true}
                      items={this.state.items}
                      style={{ ...pickerSelectStyles }}
                      value={this.state.privacy}
                      onValueChange={value => {
                        this.setState({
                          privacy: value
                        });
                      }}
                    />
                  </View>
                  <Image
                    source={Icons.ic_down_arrow_picker}
                    style={{ width: 15, height: 15, margin: 5, marginEnd: 10 }}
                  />
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: Colors.colorLine,
                  borderBottomWidth: 1
                }}
              />
              
              <ScrollView>
              <TextInput
                ref={"messages"}
                placeholder="Write a post,share link or picture..."
                style={{
                  marginStart: 10,
                  marginEnd: 10
                }}
                underlineColorAndroid={Colors.transparent}
                value={this.state.messages}
                onChangeText={text => {
                  this.setState({ messages: text });
                }}
              />

              <ProgressCompoment isProgress={this.state.isProgress} />
           
              <Image
                resizeMode='contain'
                style={{
                 

                 flexWrap:'wrap',
                
                  height: Dimensions.get('window').height/2,
                  width: Dimensions.get('window').width
                }}
                source={
                  this.state.postImage != ""
                    ? { uri: this.state.postImage }
                    : ""
                }
              />
              </ScrollView>
            
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 0,
                flex: 1,
                borderTopColor: Colors.colorLine,
                width: "100%",
                borderTopWidth: 1,
                alignItems: "center",
                backgroundColor:Colors.white
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
                    marginBottom: 10,
                    backgroundColor:Colors.white
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    backgroundColor: "white",
    color: Colors.navBg
  },
  inputAndroid: {
    fontSize: 12,
    alignItems: "center",
    color: Colors.navBg
  }
});
export default AddPostScreen;
