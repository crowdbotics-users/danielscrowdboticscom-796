import React, { PureComponent } from "react";
import {
  View,
  Platform,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  NetInfo,
  AsyncStorage,
  Alert
} from "react-native";
import EditProfileHeaderCompoment from "../Compoments/EditProfileHeaderCompoment";
import editscreenstyle from "../Resource/editscreenstyle";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import ImagePicker from "react-native-image-crop-picker";
import ApiUrl from "../Network/ApiUrl";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";

class EditProfileScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => (
        <EditProfileHeaderCompoment {...props} props={navigation} />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isMaleActive: false,
      isFemaleActive: false,
      isOtherActive: false,
      gender: "",
      isProgress: false,
      isActiveEveryone: true,
      isActiveYourCrew: false,
      isActiveYourCrewFollower: false,
      full_name: "",
      post_status: "all",
      profilePicture: "",
      coverPicture: "",
      favouriteSport: [
        {
          companyname: "ADIDAS",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "100 Points",
          image: Icons.ball6
        },
        {
          companyname: "NIKE",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "08 Points",
          image: Icons.ball7
        },
        {
          companyname: "THE BAY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "20 Points",
          image: Icons.ball8
        },
        {
          companyname: "ZARA",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "06 Points",
          image: Icons.ball9
        },
        {
          companyname: "BEST BUY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "15 Points",
          image: Icons.ball10
        },
        {
          companyname: "BEST BUY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "15 Points",
          image: Icons.ball11
        }
      ]
    };
  }
  componentDidMount() {
    this.doGetUserInfo();
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doRedirect(screen){
    const {navigate} =this.props.navigation;
    navigate(screen);
  }
  doGetUserInfoApi(bodyData) {
    fetch(ApiUrl.getUserProfile, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;


            this.setState({
              full_name: result.full_name,
              profilePicture: result.profile_image,
              coverPicture: result.cover_image,
              post_status: result.post_status,
              gender: result.gender,
            });
            if(result.gender=="male"){
              this.doChangeGender("male");
            }else if(result.gender=="female"){
              this.doChangeGender("female");
            }else if(result.gender=="other"){
              this.doChangeGender("other");
            }
            if (result.post_status == "all") {
              this.doChangeSeePost("everyone");
            } else {
              this.doChangeSeePost("everyone");
            }
            break;
          }
          case 401: {

            alert(message);

            break;
          }
          case 400: {

            alert(message);

            break;
          }
        }
        this.hideProgressbar();
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
      });
  }
  doGetUserInfo() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {

            if (data != null) {
              const myData = JSON.parse(data);


              let postData = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + myData.token,
                  "Content-Type": "multipart/form-data"
                }
              };

              this.openProgressbar();
              this.doGetUserInfoApi(postData);
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
  doSportClick(data) {
    //  alert(JSON.stringify(data));
  }
  doChangeGender(gender) {
    if (gender == "male") {
      this.setState({
        gender: "male",
        isMaleActive: true,
        isFemaleActive: false,
        isOtherActive: false
      });
    } else if (gender == "female") {
      this.setState({
        gender: "female",
        isMaleActive: false,
        isFemaleActive: true,
        isOtherActive: false
      });
    } else if (gender == "other") {
      this.setState({
        gender: "other",
        isMaleActive: false,
        isFemaleActive: false,
        isOtherActive: true
      });
    } else {
      this.setState({
        gender: "male",
        isMaleActive: true,
        isFemaleActive: false,
        isOtherActive: false
      });
    }
  }
  pickSingleProfile(cropit, circular = true) {
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
          profilePicture: image.path
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
        console.log(e);
        alert(e.message ? e.message : e);
      });
  }
  pickSingleCover(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 700,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 700,
      compressImageMaxHeight: 700,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          coverPicture: image.path
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
        console.log(e);
        alert(e.message ? e.message : e);
      });
  }
  pickSingleWithCameraProfile(cropping, circular = true) {
    ImagePicker.openCamera({
      cropping: cropping,
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
          profilePicture: image.path
        });
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null
        });
      })
      .catch(e => alert(e));
  }
  pickSingleWithCameraCover(cropping, circular = false) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 700,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 700,
      compressImageMaxHeight: 700,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          coverPicture: image.path
        });
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null
        });
      })
      .catch(e => alert(e));
  }
  doChangeSeePost(screen) {
    if (screen == "everyone") {
      this.setState({
        post_status: "all",
        isActiveEveryone: true,
        isActiveYourCrew: false,
        isActiveYourCrewFollower: false
      });
    } else if (screen == "yourcrew") {
      this.setState({
        post_status: "onlycrew",
        isActiveEveryone: false,
        isActiveYourCrew: true,
        isActiveYourCrewFollower: false
      });
    } else if (screen == "yourcrewfollower") {
      this.setState({
        post_status: "crewfollower",
        isActiveEveryone: false,
        isActiveYourCrew: false,
        isActiveYourCrewFollower: true
      });
    }
  }
  doUpdateProfile() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {



              const myData = JSON.parse(data);
              const bodyData = new FormData();
              if (this.state.profilePicture != "") {
                bodyData.append("profile_image", {
                  uri: this.state.profilePicture,
                  type: "image/jpeg",
                  name: "image1.jpeg"
                });
              }
              if (this.state.coverPicture != "") {
                bodyData.append("cover_image", {
                  uri: this.state.coverPicture,
                  type: "image/jpeg",
                  name: "image2.jpeg"
                });
              }

              bodyData.append("name", this.state.full_name);
              bodyData.append("post_status", this.state.post_status);
              bodyData.append("gender", this.state.gender);

              this.openProgressbar();
              console.log("doUpdateProfile", bodyData);
              console.log(myData);

              this.doUpdateUserInfoApi(bodyData, myData.token);
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
  doUpdateUserInfoApi(bodyData, token) {
    fetch(ApiUrl.editUserProfile, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("doUpdateUserInfoApi", responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            this.doShowSnackBar(message);
            // this.props.navigation.goBack(null);
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
        this.hideProgressbar();
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  renderItem(data) {

    return (
      <View>
        <TouchableOpacity onPress={() => this.doSportClick(data)}>
          <Image
            source={data.image}
            style={{ width: 50, height: 50, margin: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
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
  render() {
    return (
      <View style={editscreenstyle.main}>
        <ScrollView bounces={false} alwaysBounceVertical={false}>
          <View style={{ flex: 1 }}>
            <ProgressCompoment isProgress={this.state.isProgress} />
            <View style={{ marginStart: 10, marginEnd: 10 }}>
              <Text
                style={{
                  color: Colors.black,
                  marginTop: 10,
                  marginBottom: 10,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 14
                }}
              >
                Change your name
              </Text>
              <View
                style={{
                  color: Colors.black,
                  borderColor: Colors.black,
                  borderRadius: 5,
                  borderWidth: 1
                }}
              >
                <TextInput
                  style={{
                    color: Colors.black,
                    padding: Platform.OS == "android" ? 0 : 8,
                    marginStart: 5,
                    marginEnd: 5,
                    fontFamily: "OpenSans-Bold"
                  }}
                  value={this.state.full_name}
                  selectionColor={Colors.black}
                  placeholderTextColor={Colors.black}
                  underlineColorAndroid={Colors.transparent}
                  placeholder="Your Name"
                  onChangeText={full_name =>
                    this.setState({ full_name: full_name })
                  }
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.black,
                  marginTop: 5,
                  marginBottom: 10,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                You can change your name only once in 6 months.
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: Colors.colorLine,
                borderBottomWidth: 1
              }}
            />
            <View style={[styles.row, { flex: 1 }]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.black,
                    marginTop: 10,
                    marginBottom: 5,
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 12,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  Change your profile picture
                </Text>
                <View
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                    backgroundColor: "#F8F6F7",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Image
                    source={
                      this.state.profilePicture == ""
                        ? Icons.messi
                        : { uri: this.state.profilePicture }
                    }
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 34,
                      borderWidth: 1.5,
                      borderColor: Colors.bgHeader,
                      alignSelf: "center"
                    }}
                  />
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginBottom: 5,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.pickSingleWithCameraProfile(true, true)}
                    style={{
                      flex: 1
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={Icons.ic_camera_profile}
                        style={[styles.icon, { marginStart: 10, margin: 3 }]}
                      />
                      <Text
                        style={{
                          color: Colors.black,

                          marginStart: 5,
                          marginEnd: 10,
                          fontFamily: "OpenSans-Bold",
                          fontSize: 14
                        }}
                      >
                        Take a photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    flex: 1,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.pickSingleProfile(true, true)}
                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black,
                        margin: 5,
                        marginStart: 10,
                        marginEnd: 10,
                        fontFamily: "OpenSans-Bold",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center"
                      }}
                    >
                      Upload Picture
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    flex: 1,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity

                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black,
                        margin: 5,
                        marginStart: 10,
                        marginEnd: 10,
                        fontFamily: "OpenSans-Bold",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center"
                      }}
                    >
                      Choose from gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  borderRightColor: Colors.colorLine,
                  borderRightWidth: 1,
                  marginTop: 5,
                  marginBottom: 5
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.black,
                    marginTop: 10,
                    marginBottom: 5,
                    marginStart: 10,
                    marginEnd: 10,
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 12
                  }}
                >
                  Change your cover picture
                </Text>
                <View
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 10,
                    backgroundColor: "#F8F6F7",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Image
                    source={
                      this.state.coverPicture == ""
                        ? Icons.toolbarbg
                        : { uri: this.state.coverPicture }
                    }
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: Colors.bgHeader,
                      alignSelf: "center"
                    }}
                  />
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginBottom: 5,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.pickSingleWithCameraCover(true, false)}
                    style={{
                      flex: 1
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={Icons.ic_camera_profile}
                        style={[styles.icon, { marginStart: 10, margin: 3 }]}
                      />
                      <Text
                        style={{
                          color: Colors.black,

                          marginStart: 5,
                          marginEnd: 10,
                          fontFamily: "OpenSans-Bold",
                          fontSize: 14
                        }}
                      >
                        Take a photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    flex: 1,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.pickSingleCover(true, false)}
                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black,
                        margin: 5,
                        marginStart: 10,
                        marginEnd: 10,
                        fontFamily: "OpenSans-Bold",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center"
                      }}
                    >
                      Upload Picture
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    color: Colors.black,
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    flex: 1,
                    marginStart: 10,
                    marginEnd: 10
                  }}
                >
                  <TouchableOpacity

                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black,
                        margin: 5,
                        marginStart: 10,
                        marginEnd: 10,
                        fontFamily: "OpenSans-Bold",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center"
                      }}
                    >
                      Choose from gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: Colors.colorLine,
                borderBottomWidth: 1
              }}
            />
            <Text
              style={{
                color: Colors.black,
                marginTop: 10,

                fontFamily: "OpenSans-SemiBold",
                fontSize: 12,

                textAlign: "center"
              }}
            >
              Change your favorite sports
            </Text>
            <Text
              style={{
                color: Colors.black,

                fontFamily: "OpenSans-SemiBold",
                fontSize: 12,

                textAlign: "center"
              }}
            >
              You can choose up to 6 sports
            </Text>
            <FlatList
              style={{ alignSelf: "center" }}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              bounces={false}
              data={this.state.favouriteSport}
              renderItem={({ item, index }) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={()=>this.doRedirect('FavoriteSportScreen')}>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    borderColor: Colors.black,
                    borderRadius: 5,
                    borderWidth: 1,
                    color: Colors.black,
                    padding: 5,
                    fontFamily: "OpenSans-Bold",
                    fontSize: 13
                  }}
                >
                  Choose your favorite sports
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: Colors.colorLine,
                borderBottomWidth: 1
              }}
            />
            <View style={{ flexDirection: "row", marginTop: 15, marginStart: 10,
                    marginEnd: 10 }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.doChangeGender("male")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isMaleActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: this.state.isMaleActive?Colors.bgHeader:Colors.colorEdittext,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isMaleActive
                          ? Colors.white
                          : Colors.colorEdittext
                      }}
                    >
                      Male
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, marginStart: 8, marginEnd: 8 }}
                  onPress={() => this.doChangeGender("female")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isFemaleActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: this.state.isFemaleActive?Colors.bgHeader:Colors.colorEdittext,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isFemaleActive
                          ? Colors.white
                          : Colors.colorEdittext
                      }}
                    >
                      Female
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.doChangeGender("other")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: this.state.isOtherActive
                        ? Colors.bgHeader
                        : Colors.white,
                      padding: 5,
                      borderRadius: 4,
                      borderColor: this.state.isOtherActive?Colors.bgHeader:Colors.colorEdittext,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontFamily: "OpenSans-SemiBold",
                        color: this.state.isOtherActive
                          ? Colors.white
                          : Colors.colorEdittext
                      }}
                    >
                      Other
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            <Text
              style={{
                color: Colors.black,

                fontFamily: "OpenSans-SemiBold",
                fontSize: 12,
                marginTop: 10,
                marginBottom: 10,
                textAlign: "center"
              }}
            >
              Who can see your posts?
            </Text>
            <View
              style={[
                styles.row,
                {
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 10,
                  marginBottom: 20
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => this.doChangeSeePost("everyone")}
              >
                <Text
                  style={
                    this.state.isActiveEveryone
                      ? editscreenstyle.activeEveryone
                      : editscreenstyle.InActiveEveryone
                  }
                >
                  Eeveryone
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.doChangeSeePost("yourcrew")}
                style={{ marginStart: 5, marginEnd: 5 }}
              >
                <Text
                  style={
                    this.state.isActiveYourCrew
                      ? editscreenstyle.activeYourCrew
                      : editscreenstyle.InActiveYourCrew
                  }
                >
                  Your Crew
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.doChangeSeePost("yourcrewfollower")}
              >
                <Text
                  style={
                    this.state.isActiveYourCrewFollower
                      ? editscreenstyle.activeYourCrewFollower
                      : editscreenstyle.InActiveYourCrewFollower
                  }
                >
                  Your Crew & Follower
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.doUpdateProfile()}
              style={{
                backgroundColor: "#6da82a",
                height: 40,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: "OpenSans-Bold",
                  color: Colors.white,
                  textAlign: "center",
                  padding: 5
                }}
              >
                SAVE CHANGES!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfileScreen;
