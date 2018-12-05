import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform,
  NetInfo,
  Alert,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import Moment from "moment";
import ApiUrl from "../Network/ApiUrl";
import { NavigationActions, StackActions } from "react-navigation";
class SearchListCompoment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedData: []
    };
  }
  doRedirect(data) {
    this.props.navigation.navigate("ProfileScreen", { data: data });
  }

  doCommentList(data) {
    this.props.navigation.navigate("CommentListScreen", { commentdata: data });
  }
  doLikePost(postdata, index) {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);
              const bodyData = JSON.stringify({ post_id: postdata.id });

              this.doLikePostApi(bodyData, myData.token, index);
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
  doLikePostApi(bodyData, token, index) {
    fetch(ApiUrl.likePost, {
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
        const message = responseJson.message;
        const status = responseJson.status;
        const result = responseJson.result;
        this.changeLikeCount(index, result.likes_count, result.is_like);
        switch (status) {
          case 200: {
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
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  }
  changeLikeCount(index, likes_count, is_like) {
    let originalData = this.props.streams;
    let copyData = this.props.streams;
    let updatedData = copyData[index];
    updatedData.is_like = is_like;
    updatedData.likes_count = likes_count;
    originalData[index] = updatedData;
    this.setState({
      updatedData: originalData
    });
  }
  renderStream(data, index) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 1, borderRadius: 0 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", marginTop: 8 }
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F8F6F7",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <Image
                source={
                  data.users.profile_image == ""
                    ? Icons.messi
                    : { uri: data.users.profile_image }
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
            <TouchableOpacity
              onPress={() => this.doRedirect(data)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13,
                  marginStart: 5
                }}
              >
                {data.users.full_name}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginRight: 8
              }}
            >
              {Moment(data.created_at).format("hh:mm A")}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 15,
              marginRight: 8,
              color: "#6C6C6C",

              fontSize: 12
            }}
          >
            {data.description}
          </Text>
          <View
            style={[
              styles.row,
              {
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 5
              }
            ]}
          >
            <Image
              source={data.is_like ? Icons.ic_like : Icons.ic_dislike}
              style={{
                width: 20,
                height: 20
              }}
            />

            <TouchableOpacity onPress={() => this.doLikePost(data, index)}>
              <Text
                style={{
                  marginLeft: 5,
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                Like ({data.likes_count})
              </Text>
            </TouchableOpacity>
            <Image
              source={Icons.ic_comment}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                margin: 8
              }}
            />
            <TouchableOpacity
              onPress={() => this.doCommentList(data)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                Comment ({data.comment_count})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderEmpty() {
    return (
      <View>
        <Text
          style={{
            color: Colors.white,
            fontFamily: "OpenSans-SemiBold",
            fontSize: 11,
            textAlign: "center"
          }}
        >
          No Data Found
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        <FlatList
          extraData={this.state.updatedData}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          style={{ marginTop: 5 }}
          data={this.props.searches}
          renderItem={({ item, index }) => this.renderStream(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.renderEmpty()}
          nestedScrollEnabled={true}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

SearchListCompoment.propTypes = {
  searches: PropTypes.array,
  navigation: PropTypes.object
};
export default SearchListCompoment;
