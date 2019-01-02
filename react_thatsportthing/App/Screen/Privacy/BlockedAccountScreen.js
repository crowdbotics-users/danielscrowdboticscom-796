import React, { PureComponent } from "react";
import { SafeAreaView, View, FlatList, ActivityIndicator,Text,Image,TouchableOpacity } from "react-native";
import Colors from "../../Resource/Colors";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Icons from "../../Resource/Icons";
import ApiUrl from "../../Network/ApiUrl";

class BlockedAccountScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent
          {...props}
          props={navigation}
          title="BLOCKED ACCOUNTS"
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      page: 1,
      seed: 1,
      refreshing: false,
      dataSource: [
        {
          name: "John",
          profile_image:''
        },
        {
          name: "Smith",
          profile_image:''
        },
        {
          name: "Steve",
          profile_image:''
        },
        {
          name: "Jhonny",
          profile_image:''
        },
        {
          name: "Steve",
          profile_image:''
        },
        {
          name: "John",
          profile_image:''
        },
        {
          name: "Smith",
          profile_image:''
        },
        {
          name: "Steve",
          profile_image:''
        },
        {
          name: "Jhonny",
          profile_image:''
        },
        {
          name: "Steve",
          profile_image:''
        }
      ]
    };
  }
  fetchData = () => {
    const { page, seed } = this.state;
    const url =ApiUrl.getBlockedAccount;
    this.setState({ loading: true });
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          dataSource:
            page == 1
              ? response.results
              : [...this.state.dataSource, ...response.results],
          isLoading: false,
          refreshing: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  onRefresh = () => {
    this.setState({
      dataSource: [],
      isLoading: false,
      refreshing: false,
      seed: 1,
      page: 1
    });
    //  this.fetchData()
  };
  loadMore = () => {
    this.setState({
      refreshing: false,
      page: this.state.page + 1
    });
    // this.fetchData()
  };
  renderItem(item, index) {
    console.log(item,index);

    return (
      <View style={{ flexDirection: "row",alignItems:'center',marginStart:5,marginEnd:5 }}>
        <View style={{marginStart:5}}>
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
          <Text style={{marginStart:10,color:Colors.colorEdittext,fontSize:16,fontFamily:'OpenSans-Bold'}}>{item.name}</Text>
        </View>
        <View>
          <TouchableOpacity>
          <Text style={{color:Colors.red,fontSize:12,fontFamily:'OpenSans-SemiBold',marginEnd:10}}>X UNBLOCK</Text>
          </TouchableOpacity>
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
              padding: 20,
              justifyContent: "center",
              display: this.state.isLoading ? "flex" : "none"
            }}
          >
            <ActivityIndicator />
          </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={item => item.toString()}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.loadMore}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default BlockedAccountScreen;
