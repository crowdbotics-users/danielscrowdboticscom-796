import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class AddCommentCompoment extends Component {
  toggleDrawer(screen) {
    this.props.navigation.navigate(screen,{post_id:this.props.post_id});
  }

  render() {
    return (
      <View
        style={{
      
         
         margin:5
       
        }}
      >
        <TouchableOpacity onPress={()=>this.toggleDrawer("AddCommentScreen")} >
          <View style={[styles.row,{ padding:10,backgroundColor:'#f6f6f6',alignItems:'center',borderRadius:8,margin:5,elevation:2}]}>
            <Image
              source={Icons.ic_write_post}
              style={{ width: 30, height: 30, }}
            />
           <View>
           <Text
              style={{
             
                color: Colors.colorEdittext,
                textAlign: "center",
                fontFamily: "OpenSans-Light",
                fontSize: 14,
               marginStart:5
              }}
            >
              Add a Comment
            </Text>
           </View>
          </View>
        </TouchableOpacity>
        
      </View>
    );
  }
}
AddCommentCompoment.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  post_id:PropTypes.number
};
export default AddCommentCompoment
