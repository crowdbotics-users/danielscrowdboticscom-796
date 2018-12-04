import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  NetInfo,
  AsyncStorage,
  Alert, TouchableOpacity, SafeAreaView
} from "react-native";
import Colors from "../Resource/Colors";
import CommentHeaderCompoment from "../Compoments/CommentHeaderCompoment";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import AddCommentCompoment from "../Compoments/AddCommentCompoment";
import ApiUrl from "../Network/ApiUrl";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import Moment from "moment";
class CommentListScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => (
        <CommentHeaderCompoment
          {...props}
          props={navigation}
          totalComments={12}
        />
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      full_name: '',
      profile_image: '',
      description: '',
      created_at: '',
      isProgress: false,
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      total: 0
    };
  }
  componentDidMount() {
    const { data } = this.props.navigation.state.params;
    this.setState({
      full_name: data.users.full_name,
      profile_image: data.users.profile_image,
      description: data.description,
      created_at: data.created_at
    });
    console.log("componentDidMount", data);
    this.doCommentList(data);
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doCommentList = (postdata) => {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {

            if (data != null) {
              const myData = JSON.parse(data);

              const bodyData = JSON.stringify({ post_id: postdata.id });

              this.openProgressbar();
              this.doCommentListApi(bodyData, myData.token);
            } else {

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
  doCommentListApi(bodyData, token) {
    const { page, seed } = this.state;
    fetch(ApiUrl.getCommentsList, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
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
            const result = responseJson.result;


            this.setState({
              data:
                page === 1 ? result.data : [...this.state.data, ...result.data],
              loading: false,
              refreshing: false,
              total: result.total
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
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  renderCommentItem(item) {
    return (
      <View>
        <View style={[styles.row]}>
          <View style={{ flex: 0, marginTop: 5 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F8F6F7",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={
                  item.users.profile_image == ""
                    ? Icons.messi
                    : { uri: item.users.profile_image }
                }
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignContent: "center" }}>
            <View style={[styles.row, { marginTop: 5 }]}>
              <Text
                style={{

                  flex: 1,
                  color: Colors.colorEdittext,
                  fontFamily: "OpenSans-Light",
                  fontSize: 12
                }}
              >
                <Text
                  style={{
                    marginEnd: 5,
                    color: Colors.colorEdittext,
                    fontSize: 13,
                    fontFamily: "OpenSans-Bold"
                  }}
                >
                  {item.users.full_name + ` `}
                </Text>
                {` ` + item.messages}

              </Text>
            </View>
            <View style={[styles.row, { marginTop: 5 }]}>
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontFamily: "OpenSans-Light",
                  fontSize: 13
                }}
              >
                {Moment(item.created_at).format("hh:mm A")}
              </Text>
              <TouchableOpacity>

                <Text
                  style={{
                    marginStart: 5,
                    color: Colors.colorEdittext,
                    fontFamily: "OpenSans-Bold",
                    fontSize: 12
                  }}
                >
                  Reply ({item.reply_count})
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0, alignItems: "center", marginTop: 8, justifyContent: 'center', alignContent: 'center' }}>
            <Image source={Icons.ic_like} style={[styles.icon, { width: 20, height: 20 }]} />
            <Text
              style={{
                color: "#717171",
                fontFamily: "OpenSans-Light",
                fontSize: 13,

              }}
            >
              0
            </Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (

      <View style={customstyles.container}>
        <View
          style={{
            borderBottomColor: Colors.colorLine,
            borderBottomWidth: 1,
            padding: 10
          }}
        >
          <View style={[styles.row, { alignItems: "center" }]}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F8F6F7",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={this.state.profile_image == "" ? Icons.messi : { uri: this.state.profile_image }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
            <Text
              style={{
                marginStart: 5,
                color: Colors.colorEdittext,
                fontSize: 13,
                fontFamily: "OpenSans-Bold",
                flex: 1
              }}
            >
              {this.state.full_name}
            </Text>
            <Text
              style={{
                color: Colors.colorEdittext,
                fontFamily: "OpenSans-Bold",
                fontSize: 13,
                marginRight: 8
              }}
            >

              {Moment(this.state.created_at).format("hh:mm A")}
            </Text>
          </View>
          <Text
            style={{
              color: "#717171",
              fontFamily: "OpenSans-Light",
              fontSize: 12
            }}
          >
            {this.state.description}
          </Text>
        </View>
        <ProgressCompoment isProgress={this.state.isProgress} />
        <View style={{ position: "relative", flex: 1 }}>
          <View style={{ position: "relative", flex: 3 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => this.renderCommentItem(item)}
              style={{ marginStart: 10, marginEnd: 10, marginBottom: 80 }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              bottom: 0,
              backgroundColor: Colors.white
            }}
          >
            <View
              style={{ borderTopColor: Colors.colorLine, borderTopWidth: 1 }}
            >
              <AddCommentCompoment navigation={this.props.navigation} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const customstyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white }
});
export default CommentListScreen;
