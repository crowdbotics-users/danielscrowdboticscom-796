import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  Text,
  Alert,
  FlatList,
  NetInfo,
  AsyncStorage
} from "react-native";
import NestedScrollView from "react-native-nested-scroll-view";
import HeaderMenuComponent from "../../Compoments/HeaderCompoments/HeaderMenuComponent";
import MyProfileBannerComponent from "../../Compoments/BannerComponents/MyProfileBannerComponent";
import Colors from "../../Resource/Colors";
import styles from "../../Resource/Styles";
import Icons from "../../Resource/Icons";
import WritePostCompoment from "../../Compoments/WritePostCompoment";
import MyPostListComponent from "../../Compoments/ListComponents/MyPostListComponent";
import ApiUrl from "../../Network/ApiUrl";

class MyProfileScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderMenuComponent {...props} props={navigation} title="MY PROFILE" />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isProgress: false,
      loading: false,
      refreshing: false,
      filteredData: [],
      postData: [],
      originalPostData: [],
      myPostData: [],
      originalMyPostData: [],
      profile_image: '',
              cover_image: '',
              full_name: '',
              user_name: '',
              follower_count: 0,
              crew_count: 0,
      dataSource: [
        {
          companyname: "ADIDAS",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "100 Points",
          image: Icons.ball5
        },
        {
          companyname: "NIKE",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "08 Points",
          image: Icons.ball2
        },
        {
          companyname: "THE BAY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "20 Points",
          image: Icons.ball3
        },
        {
          companyname: "ZARA",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "06 Points",
          image: Icons.ball4
        },
        {
          companyname: "BEST BUY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "15 Points",
          image: Icons.ball1
        }
      ]
    };
  }
  componentDidMount() {
    try {
      this.getPostList(false);
    } catch (error) {
      console.log(error);
    }
  }

  getPostList(showProgress) {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);

              let postData = {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + myData.token,
                  "Content-Type": "multipart/form-data"
                },
                body: JSON.stringify({
                  page: this.state.page
                })
              };
              let getUserData = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + myData.token,
                  "Content-Type": "multipart/form-data"
                }
              };
              this.getUserInfoApi(getUserData);
              if (showProgress) {
                this.setState({
                  isProgress: true,
                  postData: [],
                  myPostData: []
                });
                this.getPostListApi(postData, showProgress);
              } else {
                this.setState({
                  isProgress: false,
                  postData: [],
                  myPostData: []
                });
                this.getPostListApi(postData, showProgress);
              }
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
  getUserInfoApi(bodyData) {
    fetch(ApiUrl.getUserProfile, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              profile_image: result.profile_image,
              cover_image: result.cover_image,
              full_name: result.full_name,
              user_name: result.user_name,
              follower_count: result.follower_count,
              crew_count: result.crew_count
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
  getPostListApi(bodyData, showProgress) {
    fetch(ApiUrl.getMyPostsList, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              originalPostData: result.data,
              postData: result.data
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
        if (showProgress) {
          this.setState({ isProgress: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  renderRow(data, index) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={data.image}
          style={{ width: 40, height: 40, margin: 5 }}
        />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NestedScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyProfileBannerComponent
              full_name={this.state.full_name}
              user_name={this.state.user_name}
              crew_count={this.state.crew_count}
              follower_count={this.state.follower_count}
              navigation={this.props.navigation}
            />
            <View
              style={{ backgroundColor: Colors.navBg, alignItems: "center" }}
            >
              <FlatList
                horizontal={true}
                showsVerticalScrollIndicator={true}
                alwaysBounceVertical={false}
                bounces={false}
                numColumns={1}
                data={this.state.dataSource}
                renderItem={({ item, index }) => this.renderRow(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 11,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                FAVORITES
              </Text>
              <View
                style={{
                  borderColor: "##737373",
                  borderBottomColor: "#737373",
                  borderBottomWidth: 1,
                  borderWidth: 1,
                  width: "100%",
                  marginTop: 3,
                  marginStart: 10,
                  marginEnd: 10
                }}
              />
              <View
                style={{
                  width: "100%",
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 5,
                  marginTop: 0
                }}
              >
                <WritePostCompoment navigation={this.props.navigation} />
              </View>
            </View>
            <MyPostListComponent
              streams={this.state.postData}
              updateStreams={this.state.originalPostData}
              navigation={this.props.navigation}
            />
          </View>
        </NestedScrollView>
      </SafeAreaView>
    );
  }
}

export default MyProfileScreen;
