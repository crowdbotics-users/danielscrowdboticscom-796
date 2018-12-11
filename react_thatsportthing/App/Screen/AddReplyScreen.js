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
  SafeAreaView
} from "react-native";
import AddReplyHeaderComponent from "../Compoments/AddReplyHeaderCompoment";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import ApiUrl from "../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";

class AddReplyScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      profile_image: "",
      messages: "",
      isProgress: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => <AddReplyHeaderComponent {...props} props={navigation} />
    };
  };

  doAddComment() {
    if (this.state.messages == "") {
      this.refs.message.focus();
      alert("Write a reply");
    } else {
      const { post_id, comment_id } = this.props.navigation.state.params;
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          AsyncStorage.getItem("data")
            .then(data => {
              console.log("AsyncStorage");
              if (data != null) {
                const myData = JSON.parse(data);
                const bodyData = JSON.stringify({
                  post_id: post_id,
                  comment_id: comment_id,
                  type: "reply",
                  messages: this.state.messages
                });

                this.openProgressbar();
                console.log(post_id);
                console.log(bodyData);

                this.doAddCommentApi(bodyData, myData.token);
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
  doAddCommentApi(bodyData, token) {
    fetch(ApiUrl.addComment, {
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
            //this.props.navigation.goBack(null);
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
  componentDidMount() {
    AsyncStorage.getItem("data")
      .then(data => {
        console.log("AsyncStorage");
        if (data != null) {
          const myData = JSON.parse(data);
          this.setState({
            full_name: myData.full_name,
            profile_image: myData.profile_image,
          });
        } else {
          console.log(data);
        }
      })
      .done();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                    marginStart: 10,
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold"
                  }}
                >
                  {this.state.full_name}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: Colors.colorLine,
                  borderBottomWidth: 1
                }}
              />
              <TextInput
                ref={"message"}
                placeholder="Write a reply..."
                style={{ marginStart: 10, marginEnd: 10 }}
                underlineColorAndroid={Colors.transparent}
                value={this.state.messages}
                onChangeText={text => {
                  this.setState({ messages: text });
                }}
              />
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

                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => this.doAddComment()}>
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

export default AddReplyScreen;
