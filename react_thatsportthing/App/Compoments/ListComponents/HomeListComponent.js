import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  NetInfo,
  Alert,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import Moment from "moment";
import { NavigationActions, StackActions } from "react-navigation";
import styles from "../../Resource/Styles";
import Icons from "../../Resource/Icons";
import ApiUrl from "../../Network/ApiUrl";
import Colors from "../../Resource/Colors";
class HomeListComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      refreshing: false,
      updatedData: [],
      data: []
    };
  }

  doRedirect(postdata) {
    AsyncStorage.getItem("data")
      .then(data => {
        if (data != null) {
          const myData = JSON.parse(data);
          if(myData.id==postdata.users.id){
            this.props.navigation.navigate('MyProfileScreen');
          }else{
            this.props.navigation.navigate("ProfileScreen", { data: postdata });
          }
        } else {
        }
      })
      .done();
    
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
           // alert(message);
            break;
          }
          case 400: {
          //  alert(message);

            break;
          }
        }
      })
      .catch(error => {
      //  console.log(error);
        
      });
  }
  changeLikeCount(index, likes_count, is_like) {
      console.log('changeLikeCount',index,likes_count,is_like);
      
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
  getPosts() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);
              this.makeRemoteRequest(myData.token);
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
  makeRemoteRequest = token => {
    const { page } = this.state;
    const url = ApiUrl.getPosts + `?page=` + this.state.page;
    this.setState({ loading: true });
    let postData = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    };
    fetch(url, postData)
      .then(res => res.json())
      .then(responseJson => {
        switch (status) {
          case 200: {
            const result = responseJson.result;
            this.setState({
              data:
                page === 1 ? result.data : [...this.state.data, ...result.data],
              error: res.error || null,
              loading: false,
              refreshing: false
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
        this.setState({ error, loading: false });
      });
  };
  handleLoadMore = () => {
    this.setState({page: this.state.page + 1},()=>{
        this.getPosts();
    });
    
  };
  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="small" color={Colors.bgHeader} />
      </View>
    );
  };
  renderStream(data, index) {
    return (
      <View
        style={[
          styles.column,
          styles.card,
          { alignItems: "flex-start", marginBottom: 1, borderRadius: 0 }
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
              alignItems: "flex-start",
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
            textAlign: "left",
            fontSize: 12,
            flex: 1
          }}
        >
          {data.description}
        </Text>
        <Image
          resizeMode="contain"
          style={{
            flexWrap: "wrap",
            height:
              data.post_image != "" ? Dimensions.get("window").height / 2 : 0,
            width: data.post_image != "" ? Dimensions.get("window").width : 0
          }}
          source={data.post_image != "" ? { uri: data.post_image } : undefined}
        />
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
    );
  }
  renderEmpty() {
    return (
      <View style={{flex:1}}>
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
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          data={this.props.streams}
          renderItem={({ item, index }) => this.renderStream(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.renderEmpty()}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
        />
      </View>
    );
  }
}

HomeListComponent.propTypes = {
  streams: PropTypes.array,
  updateStreams: PropTypes.array,
  navigation: PropTypes.object
};
export default HomeListComponent;
