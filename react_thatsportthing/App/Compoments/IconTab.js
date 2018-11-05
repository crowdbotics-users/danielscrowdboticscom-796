import React, { Component } from "react";
import { Text, TouchableOpacity, View,StyleSheet } from "react-native";
import Colors from "../Resource/Colors";

class IconTab extends Component {
  render() {
    let icon = "Stream";
    const { press, focused, index } = this.props;
    if (index === 0) {
      icon = "Stream";
    } else if (index === 1) {
      icon = "Friend's Post";
    } else if (index === 2) {
      icon = "Search";
    } else if (index === 3) {
      icon = "Posts";
    } else if (index === 4) {
      icon = "Picture";
    } else {
      icon = "Friends";
    }
    return (
      <TouchableOpacity onPress={press} style={{marginStart:10,marginEnd:10,}}>
        <View style={[customstyles.button,{backgroundColor: focused?Colors.bgHeader:Colors.white,padding:5}]}>
          <Text
            style={[
              customstyles.buttonText,
              { fontFamily:'OpenSans-SemiBold', color:focused?Colors.white:Colors.bgHeader}
            ]}
          >
            {icon}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const customstyles = StyleSheet.create({
  button: {
    
    
    alignItems: "center",
   
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
     
    textAlign: "center",
    fontSize: 16,
   
  }
});
export default IconTab;
