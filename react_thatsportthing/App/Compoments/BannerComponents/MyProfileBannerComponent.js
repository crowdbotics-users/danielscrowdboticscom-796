import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  NetInfo,
  AsyncStorage,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ProfilePictureComponent from "../ButtonCompoment/ProfilePictureComponent";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ApiUrl from "../../Network/ApiUrl";

class MyProfileBannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProgress: false,
      avatarSource: "",
      friendStatus: "+Send Request"
    };
  }

  doRedirect(screen) {
    this.props.navigation.navigate(screen);
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
  doSendRequest() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            console.log("AsyncStorage");
            if (data != null) {
              if (this.props.friend_status == "") {
                const myData = JSON.parse(data);
                const bodyData = JSON.stringify({
                  receiver_id: this.props.receiver_id
                });
                this.openProgressbar();
                this.doSendRequestApi(bodyData, myData.token);
              } else if (this.props.friend_status == "pending") {
                const myData = JSON.parse(data);
                const bodyData = JSON.stringify({
                  status: 2,
                  sender_id: myData.id
                });
                console.log("cancel", bodyData);

                // this.openProgressbar();
                // this.doCancelRequestApi(bodyData, myData.token);
              }
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
  doSendRequestApi(bodyData, token) {
    fetch(ApiUrl.sendRequest, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            //this.props.navigation.goBack(null);
            this.doShowSnackBar(message);
            this.hideProgressbar();
            break;
          }
          case 401: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
            console.log(message);
            break;
          }
          case 400: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
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
  doCancelRequestApi(bodyData, token) {
    fetch(ApiUrl.requestAction, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            //this.props.navigation.goBack(null);
            this.doShowSnackBar(message);
            this.hideProgressbar();
            break;
          }
          case 401: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
            console.log(message);
            break;
          }
          case 400: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
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
  render() {
    return (
      <View>
        <ImageBackground source={Icons.toolbarbg} style={{ height: 200 }}>
          <View style={{ position: "relative", width: "100%" }}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginEnd: 10, marginTop: 10 }}
              onPress={()=>this.doRedirect('EditProfileScreen')}
            >
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,

                  backgroundColor: Colors.white,
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 1,
                    width: 1
                  }
                }}
              >
                <Image
                  source={Icons.ic_pencil_edit}
                  style={{ width: 15, height: 15, margin: 3 }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ position: "relative", width: "100%" }}>
              <ProfilePictureComponent
                circleWidth={90}
                circleHeight={90}
                circleRadius={45}
                imageWidth={88}
                imageHeight={88}
                imageRadius={44}
                profile_image=""
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                alignItems: "center"
              }}
            >
              <TouchableOpacity style={{ start: 30 }} onPress={()=>this.doRedirect('EditProfileScreen')}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,

                    backgroundColor: Colors.white,
                    shadowColor: "#000000",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1
                    }
                  }}
                >
                  <Image
                    source={Icons.ic_pencil_edit}
                    style={{ width: 15, height: 15, margin: 3 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: "#00000050", marginTop: 10 }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                fontFamily: "OpenSans-Bold",
                textAlign: "center"
              }}
            >
              {this.props.full_name}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                fontFamily: "OpenSans-SemiBold",
                textAlign: "center",
                display: this.props.user_name == "" ? "none" : "flex"
              }}
            >
              {"@" + this.props.user_name}
            </Text>
          </View>
          <View style={{flexDirection:'row',backgroundColor:Colors.black}}>
          <TouchableOpacity style={{ flex:1}}>
          <Text
              style={{
                color: Colors.white,
                fontSize: 12,
                fontFamily: "OpenSans-Bold",
                textAlign: "center",
               
                marginTop:5,marginBottom:5
              }}
            >
              {this.props.crew_count} Crew Mates
            </Text>
          </TouchableOpacity>
            <View style={{borderRightWidth:1,borderRightColor:Colors.white,marginTop:8,marginBottom:8}}/>
            <TouchableOpacity style={{ flex:1}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 12,
                fontFamily: "OpenSans-Bold",
                textAlign: "center",
               
                marginTop:5,marginBottom:5
              }}
            >
              {this.props.follower_count} Followers
            </Text>
            </TouchableOpacity>
          </View>
         
        </ImageBackground>
      </View>
    );
  }
}

const customstyles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  activeTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  InactiveTab: {
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  InactiveTabText: {
    padding: 10,
    color: Colors.bgHeader,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  }
});
MyProfileBannerComponent.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string,
  full_name: PropTypes.string,
  profile_image: PropTypes.string,
  cover_image: PropTypes.string,
  user_name: PropTypes.string,
  friend_status: PropTypes.string,
  follower_count: PropTypes.number,
  crew_count: PropTypes.number,
  receiver_id: PropTypes.number,
  navigation: PropTypes.object
};
export default MyProfileBannerComponent;
