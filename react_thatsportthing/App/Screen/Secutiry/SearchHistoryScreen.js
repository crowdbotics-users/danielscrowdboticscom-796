import React, { PureComponent } from "react";

import {
  View,
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  NetInfo,
  Alert,
  Image,
  ScrollView
} from "react-native";
import Colors from "../../Resource/Colors";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";

class SearchHistoryScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
    
        return {
          header: props => (
            <HeaderComponent
              {...props}
              props={navigation}
              title="SEARCH HISTORY"
            />
          )
        };
      };
    constructor(props){
        super(props);
        this.state={
        searchBody:'Clear searches you made for accounts, locations, pages or hashtags.'}
    }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.bgHeader,
                fontSize: 14,
                fontFamily: "OpenSans-Bold",
                marginTop:20,
                marginLeft:20,
                marginRight:20,
              }}
            >
              Clear Search History
            </Text>
            
          </TouchableOpacity>
          <Text
              style={{
                marginTop:5,
                marginLeft:20,
                marginRight:20,
                fontSize: 14,
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              {this.state.searchBody}
            </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default SearchHistoryScreen;
