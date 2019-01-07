import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  Platform
} from "react-native";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";

class SearchResultScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent {...props} props={navigation} title="SEARCH RESULTS" />
      )
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View style={{backgroundColor:Colors.navBg}}>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: Colors.colorImageBg,
              flexDirection: "row",
              padding: Platform.OS == "android" ? 0 : 10,
              borderColor: Colors.colorSearch,
              margin: 10,
              borderRadius: 5
            }}
          >
            <Image
              source={Icons.ic_search}
              style={{
                width: 24,
                height: 24,
                marginRight: 5,
                marginLeft: 10
              }}
            />
            <TextInput
              returnKeyType="done"
              placeholder="Search.."
              style={{
                padding: Platform.OS == "android" ? 5 : 0,
                color: Colors.colorSearch,
                flex: 1,
                marginLeft: 5,
                fontSize: 14,
                fontFamily: "OpenSans-SemiBold"
              }}
              underlineColorAndroid={Colors.transparent}
              placeholderTextColor={Colors.colorSearch}
            />
          </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchResultScreen;
