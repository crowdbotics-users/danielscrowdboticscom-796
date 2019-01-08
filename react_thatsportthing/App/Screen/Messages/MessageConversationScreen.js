import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  NetInfo,
  FlatList,
  ActivityIndicator
} from "react-native";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ImagePicker from "react-native-image-crop-picker";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../../Network/ApiUrl";
import ChatHeaderComponent from "../../Compoments/HeaderCompoments/ChatHeaderComponent";

class MessageConversationScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
//"params.full_name"
    return {
      header: props => (
        <ChatHeaderComponent
          {...props}
          props={navigation}
          title={"John Schuffer"}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      postImage: "",
      messages: "",
      search: "",
      selectedUser: "",
      selectedUserId: 0,
      selectedUserBox: false,
      isProgress: false,
      isHideList: false,
      isHideProgress: false,
      messages: [
        {
          type: "receiver",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        },
        {
          type: "sender",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        },
        {
          type: "receiver",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        },
        {
          type: "sender",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        },
        {
          type: "receiver",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        },
        {
          type: "sender",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        }
      ]
    };
  }
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
  doSendMessage() {
    if (this.state.selectedUserId == 0) {
      this.refs.search.focus();
      alert("Please Select Person");
    } else if (this.state.messages == "") {
      this.refs.messages.focus();
      alert("Write a message");
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
                  bodyData.append("conversation_image", {
                    uri: this.state.postImage,
                    type: "image/jpeg",
                    name: "image1.jpeg"
                  });
                }

                bodyData.append("content", this.state.messages);
                bodyData.append("receiver_id", this.state.selectedUserId);
                

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
    fetch(ApiUrl.sendMessage, {
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
            this.setState({search:'',messages:''});
            this.doRemoveSelected();
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
  doSearchPeopleApi(bodyData, token) {
    fetch(ApiUrl.searchPeople, {
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
        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const data = responseJson.result.data;
            this.setState({ isHideProgress: false });

            if (data.length > 0) {
              this.setState({ isHideList: true });
              this.setState({ searchPeople: data });
            } else {
              this.setState({ isHideList: false });
            }

            // this.doShowSnackBar(message);
            break;
          }
          case 401: {
            this.setState({ isHideProgress: false });
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
          case 400: {
            this.setState({ isHideProgress: false });
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
        }
      })
      .catch(error => {
        this.setState({ isHideProgress: false });
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
  onSearchPeopleClick(item) {
    this.setState({
      selectedUser: item.full_name,
      selectedUserId: item.id,
      selectedUserBox: true
    });
    this.setState({ isHideList: false });
  }
  doRemoveSelected(){
    this.setState({
      selectedUser: '',
      selectedUserId: 0,
      selectedUserBox: false
    });
    this.setState({ isHideList: false }); 
  }
  renderMessages(item, index) {
    if (item.type == "sender") {
      return (
        <View>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 8 }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 15,
                  marginStart: 10,
                  marginEnd: 10,
                  textAlign: "right"
                }}
              >
                {item.date}
              </Text>
            </View>
            <View
              style={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 8,
                backgroundColor: Colors.bgHeader,
                padding: 8,
                flex: 3
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12,
                  color: Colors.white
                }}
              >
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 8 }}
          >
            <View
              style={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                backgroundColor: Colors.colorSender,
                padding: 8,
                flex: 3
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12,
                  color: Colors.colorEdittext
                }}
              >
                {item.message}
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 15,
                  marginStart: 10,
                  marginEnd: 10
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 1
          }}
        >
          <View style={{ flex: 1,  width:'100%' }}>
            
            <FlatList
              data={this.state.messages}
              style={{marginBottom:'15%'}}
              showsVerticalScrollIndicator={true}
              alwaysBounceVertical={false}
             
              bounces={false}
             
            
              renderItem={({ item, index }) =>
                this.renderMessages(item, index)
              }
              keyExtractor={(item, index) => index}
            />
          
          <View
            style={{  position: "absolute", bottom: 0, width: "100%",backgroundColor:Colors.white }}
          >
            <View style={{ borderTopColor: "#d3d3d3", borderTopWidth: 0.8 }}>
              <TextInput
                ref={"messages"}
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  color: Colors.colorEdittext,
                  padding: 5
                }}
                placeholder="Type a message..."
                placeholderTextColor={Colors.colorEdittext}
                underlineColorAndroid={Colors.transparent}
                value={this.state.messages}
                onChangeText={text => {
                  this.setState({ messages: text });
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ flex: 0, margin: 5 }}>
                <Text
                  style={{
                    color: Colors.bgHeader,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Aa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 0, margin: 5 }}>
                <Image
                  source={Icons.ic_camera_profile}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end", margin: 5 }}
                
              >
                <Text
                  style={{
                    color: Colors.bgHeader,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default MessageConversationScreen;
