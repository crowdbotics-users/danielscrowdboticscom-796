import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, FlatList ,TouchableOpacity} from "react-native";
import ChatHeaderComponent from "../../Compoments/HeaderCompoments/ChatHeaderComponent";
import Colors from "../../Resource/Colors";

class MessageRequestScreen extends PureComponent {
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
      messages: [
        {
          type: "receiver",
          message:
            "In the latest episode of That Sports Thing from CSN Chicago and Miller Lite, host Chris Marrs talks with actors and Chicagoland natives Ryan McPartlin (Chuck, Hart of Dixie), the crippling anxiety of celebrity softball and much, much more!",
          id: 1,
          date: "03:21 PM"
        }
      ]
    };
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
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <FlatList
            data={this.state.messages}
            keyExtractor={({item, index})=>index}
            renderItem={({ item, index }) => this.renderMessages(item, index)}
          />
          <View style={{position:'absolute',bottom:0,flex:1,width:'100%'}}>
            <View style={{height:1,width:'100%',backgroundColor:Colors.colorLine}}/>
            <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 15,
                  marginStart: 10,
                  marginEnd: 10,
                  color:Colors.colorEdittext,
                  textAlign:'center',
                  marginTop:15
                }}
              >
                This is the message from the person who is not in your Crew. You can accept or decline this message request.
              </Text>
              <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
              <TouchableOpacity style={{flex:1,marginStart:'10%'}}>
                  <View style={{padding:5,borderRadius:5,borderWidth:1,borderColor:Colors.red,marginEnd:10}}>
                      <Text style={{color:Colors.red,marginStart:5,marginEnd:5,fontSize:16,textAlign:'center'}}>Decline</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,marginEnd:'10%'}}>
                  <View style={{padding:5,borderRadius:5,borderWidth:1,borderColor:Colors.green,marginStart:10}}>
                      <Text style={{color:Colors.green,marginStart:5,marginEnd:5,fontSize:16,textAlign:'center'}}>Accept</Text>
                  </View>
              </TouchableOpacity>
              </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default MessageRequestScreen;
