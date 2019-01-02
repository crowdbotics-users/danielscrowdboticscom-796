import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";

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
      isConversation: true,
      isMessageRequest: false,
      dataSource:[
        {
          messageId:1,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:0,
          profilePicture:''
        },
        {
          messageId:2,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:0,
          profilePicture:''
        },
        {
          messageId:3,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:4,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:5,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:6,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:7,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:8,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:9,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        },
        {
          messageId:10,
          name:'Mike PortNoy',
          messageText:'This is sample message',
          readStatus:1,
          profilePicture:''
        }
      ]
    };
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
  renderRow(item,index){
    
      return (
        <View style={{flexDirection:'row',alignItems:'center'}}>
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
                margin:5
              }}
            >
              <Image
                source={
                  item.profilePicture == ""
                    ? Icons.messi
                    : { uri: item.profilePicture }
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
          <View style={{flex:1}}>
            <Text>{item.name}</Text>
            <Text>{item.messageText}</Text>
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
                  <Text style={{ color: Colors.white }}>Conversations (2)</Text>
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
                    Message Requests (4)
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
              renderItem={({item,index})=>this.renderRow(item,index)}
            />
        </View>
      </SafeAreaView>
    );
  }
}

export default MessageListScreen;
