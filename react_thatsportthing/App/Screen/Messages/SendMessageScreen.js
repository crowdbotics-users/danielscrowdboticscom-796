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
import SendMessageHeaderComponent from "../../Compoments/HeaderCompoments/SendMessageHeaderCompoment";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ImagePicker from "react-native-image-crop-picker";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../../Network/ApiUrl";

class SendMessageScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <SendMessageHeaderComponent
          {...props}
          props={navigation}
          isProfile={true}
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
      searchPeople: [
        { user: "bhavin" },
        { user: "jitendra" },
        { user: "naimish" },
        { user: "rahul" },
        { user: "pavan" },
        { user: "vrajesh" }
      ],
      searchPeople1: [
        { user: "bhavin" },
        { user: "jitendra" },
        { user: "naimish" },
        { user: "rahul" },
        { user: "pavan" },
        { user: "vrajesh" }
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
  renderSearchPeople(item, index) {
    return (
      <View>
        <TouchableOpacity onPress={() => this.onSearchPeopleClick(item)}>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              color: Colors.colorEdittext,
              margin: 5,
              fontSize: 14
            }}
          >
            {item.full_name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  doSearchPeople() {
    if (this.state.search == "") {
      this.refs.search.focus();
      alert("Please Select Person");
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("data")
            .then(data => {
              console.log("AsyncStorage");
              if (data != null) {
                const myData = JSON.parse(data);
                const bodyData = JSON.stringify({
                  search_data: this.state.search
                });

                this.setState({ isHideProgress: true });
                this.doSearchPeopleApi(bodyData, myData.token);
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
  filterSearch(text) {
    const newData = this.state.searchPeople1.filter(item => {
      const itemData = item.user.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      search: text,
      searchPeople: newData // after filter we are setting users to new array
    });
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
          <View style={{ flex: 1, position: "relative", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "#d3d3d3",
                borderBottomWidth: 0.8
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  color: Colors.colorEdittext,
                  margin: 8,
                  fontSize: 14
                }}
              >
                To:
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TextInput
                  ref={"search"}
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    color: this.state.selectedUserBox
                      ? Colors.white
                      : Colors.colorEdittext,
                    padding:0,
                    flex:0.3,
                    fontSize: 14,
                    textAlign:this.state.selectedUserBox ?'center':'left',
                    borderRadius: this.state.selectedUserBox ? 15 : 0,
                    backgroundColor: this.state.selectedUserBox
                      ? Colors.drawerBg
                      : Colors.transparent
                  }}
                  editable={this.state.selectedUserBox ? false : true}
                  placeholder="Search People"
                  placeholderTextColor={Colors.colorSearch}
                  underlineColorAndroid={Colors.transparent}
                  value={
                    this.state.selectedUserBox
                      ? this.state.selectedUser
                      : this.state.search
                  }
                  onBlur={() => this.doSearchPeople()}
                  // onChangeText={text => this.filterSearch(text)}
                  onChangeText={text => {
                    this.setState({ search: text });
                  }}
                />
              </View>
              <TouchableOpacity onPress={()=>this.doRemoveSelected()}>
                <Text
                  style={{
                    color: Colors.red,
                    fontFamily: "OpenSans-Bold",
                    display: this.state.selectedUserBox ? "flex" : "none",
                    fontSize: 16,
                    marginTop:10,
                    marginEnd:10
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <ActivityIndicator
                color={Colors.bgHeader}
                style={{
                  marginEnd: 5,
                  display: this.state.isHideProgress ? "flex" : "none"
                }}
              />
            </View>
            <FlatList
              data={this.state.searchPeople}
              extraData={this.state.updatedData}
              showsVerticalScrollIndicator={true}
              alwaysBounceVertical={false}
              style={{ display: this.state.isHideList ? "flex" : "none" }}
              bounces={false}
              numColumns={1}
              horizontal={true}
              renderItem={({ item, index }) =>
                this.renderSearchPeople(item, index)
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{ flex: 1, position: "absolute", bottom: 0, width: "100%" }}
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
                onPress={() => this.doSendMessage()}
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
      </SafeAreaView>
    );
  }
}

export default SendMessageScreen;
