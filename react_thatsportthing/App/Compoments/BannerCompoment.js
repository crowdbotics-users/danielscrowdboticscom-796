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
  doRedirect(screen){
    this.props.navigation.navigate(screen);

  }
  render() {
    if (
      this.props.tabTitle == "Posts" ||
      this.props.tabTitle == "Pictures" ||
      this.props.tabTitle == "Crew"
    ) {
      return (
        <View>
          <ImageBackground source={Icons.toolbarbg} style={{ height: 180 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center"
              }}
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
              <View>
                <ImageBackground
                  source={Icons.bg_username}
                  style={{ height: 80, justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 18,
                      fontFamily: "OpenSans-Bold",
                      textAlign: "center"
                    }}
                  >
                    JOHN SCHUFFER
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 14,
                      fontFamily: "OpenSans-SemiBold",
                      textAlign: "center"
                    }}
                  >
                    @schufferj
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <TouchableOpacity>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 14,
                          fontFamily: "OpenSans-SemiBold",
                          width: Dimensions.get("screen").width / 2,
                          padding: 10
                        }}
                      >
                        +Send Request
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: Colors.white,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 14,
                          fontFamily: "OpenSans-SemiBold",
                          width: Dimensions.get("screen").width / 2,
                          padding: 10
                        }}
                      >
                        Send Message
                      </Text>
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
                position: "relative",

                flex: 1
              }}
            >
              <View
                style={{
                  position: "relative",

                  flex: 1
                }}
              />
              <View
                style={{
                  position: "absolute",

                  bottom: 0,
                  width: "100%"
                }}
              >
              
              <View style={{position:'relative',flex:1}}>

                <View style={{position:'relative'}}>
                <View style={{ flexDirection: "column", width: "100%" }}>
                    <View style={{backgroundColor:'#00000060'}}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 16,
                        marginTop: 5,
                        marginBottom: 5
                      }}
                    >
                      JOHN SCHUFFER
                    </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: Colors.black,
                        flexDirection: "row"
                      }}
                    >
                      <View style={{ flex: 1,padding:5 ,alignItems:'flex-end',alignContent:'flex-end',justifyContent:'flex-end'}}>
                      
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
                      <View style={{ flex: 1,padding:5 }}>
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
                          Crew
                        </Text>
                      </View>
                      <View style={{ flex: 1,padding:5 }}>
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
                          Followers
                        </Text>
                      </View>
                      <View style={{ flex: 1 ,padding:5}}>
                        <TouchableOpacity style={{alignItems:'center',}} onPress={()=>this.doRedirect("EditProfileScreen")}>
                        <Image style={[styles.icon,{width:20,height:20}]} source={Icons.ic_setting}/>
                       
                       
                       <Text
                         style={{
                           textAlign: "center",
                           color: Colors.white,
                           fontSize: 11,
                           fontFamily: "OpenSans-SemiBold",
                           marginTop:2,
                         }}
                       >
                         Edit Profile
                       </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{position:'absolute',width:'100%',bottom:25}}>
                <View
                    style={{
                      width: 95,
                      height: 95,
                      borderRadius: 47.5,
                      backgroundColor: "#F8F6F7",
                      marginStart:20,
                     margin:10,
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
                        width: 91,
                        height: 91,
                        borderRadius: 45.5,
                        borderWidth: 1.5,
                        borderColor: "#D1D0D0",
                        alignSelf: "center"
                      }}
                    />
                  </View>

                </View>
              </View>
              
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
  profilePicture: PropTypes.string,
  navigation:PropTypes.object
};
export default BannerCompoment;
