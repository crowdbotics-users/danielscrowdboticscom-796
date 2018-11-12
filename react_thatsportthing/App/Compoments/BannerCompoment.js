import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class BannerCompoment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ""
    };
  }
  render() {
    if (this.props.tabTitle == "Posts" || this.props.tabTitle=="Pictures") {
      return (
        <View>
          <ImageBackground source={Icons.toolbarbg} style={{ height: 180 }}>
            <View style={{ alignItems: "center",justifyContent:'center',alignContent:'center' }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#F8F6F7",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Image
                  source={
                    this.props.profilePicture == ""
                      ? Icons.messi
                      : { uri: this.props.profilePicture }
                  }
                  style={{
                    width: 98,
                    height: 98,
                    borderRadius: 49,
                    borderWidth: 1.5,
                    borderColor: "#D1D0D0",
                    alignSelf: "center"
                  }}
                />
              </View>
              <View>
               
                <ImageBackground source={Icons.bg_username} style={{height:80,justifyContent:'center'}}>
                <Text style={{color:Colors.white,fontSize:18,fontFamily:'OpenSans-Bold',textAlign:'center'}}>JOHN SCHUFFER</Text>
                <Text style={{color:Colors.white,fontSize:14,fontFamily:'OpenSans-SemiBold',textAlign:'center'}}>@schufferj</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                    <TouchableOpacity>
                    <Text style={{textAlign:'center',color:Colors.white,fontSize:14,fontFamily:'OpenSans-SemiBold',width:Dimensions.get('screen').width/2,padding:10}}>+Send Request</Text>
                    </TouchableOpacity>
                    <View style={{borderEndWidth:1,borderEndColor:Colors.white,marginTop:10,marginBottom:10}}/>
                    <TouchableOpacity>
                    <Text style={{textAlign:'center',color:Colors.white,fontSize:14,fontFamily:'OpenSans-SemiBold',width:Dimensions.get('screen').width/2,padding:10}}>Send Message</Text>
                    
                    </TouchableOpacity>
                    
                </View>
                </ImageBackground>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View>
          <ImageBackground
            source={Icons.toolbarbg}
            style={{ height: 180, backgroundColor: Colors.black }}
          >
            <View
              style={{
                backgroundColor: Colors.black,
                flexDirection: "row",
                flex: 1
              }}
            >
              <View style={{ flex: 1, backgroundColor: Colors.bgHeader }}>
                <ImageBackground
                  resizeMode="cover"
                  source={Icons.toolbarbg}
                  style={{ height: 180, justifyContent: "center" }}
                >
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: "#F8F6F7",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <Image
                      source={
                        this.props.profilePicture == ""
                          ? Icons.messi
                          : { uri: this.props.profilePicture }
                      }
                      style={{
                        width: 98,
                        height: 98,
                        borderRadius: 49,
                        borderWidth: 1.5,
                        borderColor: "#D1D0D0",
                        alignSelf: "center"
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    borderBottomColor: "#707070",
                    paddingBottom: 5,
                    marginStart: 10,
                    marginEnd: 10,
                    marginTop: 10,
                    borderBottomWidth: 1
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.white,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 16
                    }}
                  >
                    JOHN SCHUFFER
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.white,
                      fontSize: 11,
                      fontFamily: "OpenSans-SemiBold"
                    }}
                  >
                    @schufferj
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    borderBottomColor: "#707070",
                    paddingBottom: 5,
                    marginTop: 10,
                    marginStart: 10,
                    marginEnd: 10,
                    borderBottomWidth: 1,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 16
                      }}
                    >
                      199
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 11,
                        fontFamily: "OpenSans-SemiBold"
                      }}
                    >
                      posts
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 16
                      }}
                    >
                      109
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 11,
                        fontFamily: "OpenSans-SemiBold"
                      }}
                    >
                      friends
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 16
                      }}
                    >
                      199
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 11,
                        fontFamily: "OpenSans-SemiBold"
                      }}
                    >
                      followers
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center"
                    }}
                  >
                    <Image source={Icons.ic_edit_profile} style={styles.icon} />
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 14,
                        fontFamily: "OpenSans-SemiBold",
                        marginStart: 5
                      }}
                    >
                      Edit Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const customstyles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  activeTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  InactiveTab: {
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  InactiveTabText: {
    padding: 10,
    color: Colors.bgHeader,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  }
});
BannerCompoment.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string,
  profilePicture: PropTypes.string
};
export default BannerCompoment;
