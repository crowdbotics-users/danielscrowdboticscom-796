import React, { Component } from "react";
import { Text, View ,NetInfo,AsyncStorage} from "react-native";
import WritePostCompoment from "../Compoments/WritePostCompoment";
import StreamListComponent from "../Compoments/StreamListCompoment";
import ApiUrl from "../Network/ApiUrl";
import { ScrollView } from "react-native-gesture-handler";
class StreamScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      postData:[],
      originalPostData:[],
    }
  }
  componentDidMount(){
    try {
      this.getPostList();
    } catch (error) {
      console.log(error);
    }
  }
  getPostList() {
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

             
              this.getPostListApi(postData);
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
  getPostListApi(bodyData) {
    fetch(ApiUrl.getPosts, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              originalPostData: result.data,
              postData: result.data,
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
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <ScrollView>
        <WritePostCompoment navigation={this.props.navigation} />
        <StreamListComponent
          streams={this.state.postData}
          updateStreams={this.state.originalPostData}
          navigation={this.props.navigation}
        />
        </ScrollView>
      </View>
    );
  }
}

export default StreamScreen;
