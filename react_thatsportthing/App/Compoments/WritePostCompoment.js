import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class WritePostCompoment extends Component {
  toggleDrawer(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop:5,
          marginBottom:0
        }}
      >
        <TouchableOpacity onPress={()=>this.toggleDrawer("AddPostScreen")} style={{flex:4,marginEnd:8}}>
          <View style={[styles.row,{ padding:10,backgroundColor:Colors.white,alignItems:'center',  width:'100%',borderRadius:8,margin:5}]}>
            <Image
              source={Icons.ic_write_post}
              style={{ width: 30, height: 30, }}
            />
           <View>
           <Text
              style={{
              
                color: Colors.colorEdittext,
                textAlign: "center",
                fontFamily: "OpenSans-SemiBold",
                fontSize: 14,
               marginStart:5
              }}
            >
              Write a Post
            </Text>
           </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.toggleDrawer("AddPostScreen")} style={{flex:0.8,marginEnd:8}}>
          <View style={[styles.row,{ padding:10,backgroundColor:Colors.white,alignItems:'center',justifyContent:'center',  width:'100%',borderRadius:8,margin:5}]}>
            <Image
              source={Icons.ic_write_camera}
              style={{ width: 30, height: 30}}
            />
           
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
WritePostCompoment.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object
};
export default WritePostCompoment;
