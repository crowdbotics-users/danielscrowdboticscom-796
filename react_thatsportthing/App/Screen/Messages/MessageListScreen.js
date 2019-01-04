import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  NetInfo,
  AsyncStorage,
  Alert
} from "react-native";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ApiUrl from "../../Network/ApiUrl";
import ProgressCompoment from "../../Compoments/ProgressCompoment";

class MessageListScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent {...props} props={navigation} title="MESSAGES" />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isProgress: false,
      empty_list: "No Messages yet.",
      conversation_count: 0,
      msg_request_count: 0,
      isConversation: true,
      isMessageRequest: false,
      dataSource: []
    };
  }
  componentDidMount() {
    this.doGetMessageList();
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doGetMessageList() {
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
                  "Content-Type": "application/json"
                }
              };

              this.openProgressbar();
              this.doGetMessageListApi(postData);
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
  doGetMessageListApi(bodyData) {
    fetch(ApiUrl.getMessageList, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              dataSource: result.data,
              conversation_count: result.data.length
            });

            break;
          }
          case 401: {
            
console.log(message);

            break;
          }
          case 400: {
            console.log(message);

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
  doSendMessage() {
    const { navigate } = this.props.navigation;
    navigate("SendMessageScreen");
  }
  doChangeTab(screen) {
    if (screen === "conversation") {
      this.setState({
        isConversation: true,
        isMessageRequest: false
      });
    } else if (screen === "request") {
      this.setState({
        isConversation: false,
        isMessageRequest: true
      });
    } else {
      this.setState({
        isConversation: false,
        isMessageRequest: false
      });
    }
  }
  renderEmpty(){
    return(
      <View style={{alignItems:'center',justifyContent:'center',alignContent:'center',height:'100%'}}>
        <Image source={Icons.empty_conversation} style={{width:100,height:100,alignSelf:'center'}}/>
        <Text
              style={{
                fontFamily: "OpenSans-Light",
                textAlign:'center',
                marginTop:20,
                fontSize: 14
              }}
            >
              {this.state.empty_list}
            </Text>
      </View>
    );
  }

  renderRow(item, index) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#F8F6F7",
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              margin: 5
            }}
          >
            <Image
              source={
                item.profile_image == ""
                  ? Icons.messi
                  : { uri: item.profile_image }
              }
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                borderWidth: 1.5,
                borderColor: "#D1D0D0",
                alignSelf: "center"
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "OpenSans-Bold",
                color: Colors.colorEdittext,
                fontSize: 16
              }}
            >
              {item.full_name}
            </Text>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor:
                  item.login_status == 1
                    ? Colors.colorOnline
                    : Colors.colorOffline
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              color: Colors.colorEdittext,
              fontSize: 16
            }}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#313131",
              padding: 10,
              alignItems: "center"
            }}
          >
            <View style={{ backgroundColor: Colors.navBg, borderRadius: 4 }}>
              <TouchableOpacity onPress={() => this.doSendMessage()}>
                <Image
                  source={Icons.ic_write_post}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Colors.white,
                    margin: 5
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.doChangeTab("conversation")}
              >
                <View
                  style={{
                    backgroundColor: this.state.isConversation
                      ? Colors.bgHeader
                      : Colors.navBg,
                    padding: 2,
                    borderRadius: 8,

                    alignItems: "center",
                    marginStart: 10,
                    marginEnd: 5
                  }}
                >
                  <Text style={{ color: Colors.white }}>
                    Conversations ({this.state.conversation_count})
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.doChangeTab("request")}
              >
                <View
                  style={{
                    backgroundColor: this.state.isMessageRequest
                      ? Colors.bgHeader
                      : Colors.navBg,
                    padding: 2,
                    borderRadius: 8,

                    alignItems: "center",
                    marginStart: 5
                  }}
                >
                  <Text style={{ color: Colors.white }}>
                    Message Requests ({this.state.msg_request_count})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderRadius: 4,
              borderColor: Colors.colorEdittext,
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              borderWidth: 1,
              margin: 10
            }}
          >
            <Image
              source={Icons.ic_search}
              style={{
                width: 20,
                height: 20,
                margin: 5,
                tintColor: Colors.colorEdittext
              }}
            />
            <TextInput
              placeholder="Search Conversations"
              placeholderTextColor={Colors.colorEdittext}
              style={{ color: Colors.colorEdittext, flex: 1, padding: 0 }}
            />
          </View>
          <FlatList
         
            data={this.state.dataSource}
            renderItem={({ item, index }) => this.renderRow(item, index)}
            ListEmptyComponent={()=>this.renderEmpty()}
          />
          <ProgressCompoment isProgress={this.state.isProgress} />
        </View>
      </SafeAreaView>
    );
  }
}

export default MessageListScreen;
