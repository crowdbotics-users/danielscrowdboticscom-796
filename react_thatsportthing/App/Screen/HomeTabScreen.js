import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { TabContent } from "../Compoments/TabContent";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";

class HomeTabScreen extends Component {
  constructor(props) {
    super(props);
    
  }
  static navigationOptions = {
    header: null
  };

  //redirect home page

  
  render() {
    return (
      <View style={{backgroundColor:Colors.bgHeader}}>
       
       <TabContent/>
      </View>
    );
  }
}

export default HomeTabScreen;
