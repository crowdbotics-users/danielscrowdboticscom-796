import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import AddPostHeaderCompoment from "../Compoments/AddPostHeaderCompoment";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import ImagePicker from "react-native-image-crop-picker";

class AddPostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postImage: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => <AddPostHeaderCompoment {...props} props={navigation} />
    };
  };
  pickSingleWithCamera(cropping, circular = true) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          postImage: image.path
        });
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null
        });
      })
      .catch(e => alert(e));
  }
  render() {
    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <View
          style={{ position: "relative", flex: 1, flexDirection: "column" }}
        >
          <View style={{ position: "relative" }}>
            <View
              style={[
                styles.row,
                { marginStart: 10, marginEnd: 10, alignItems: "center" }
              ]}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F8F6F7",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <Image
                  source={Icons.messi}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    borderWidth: 1.5,
                    borderColor: "#D1D0D0",
                    alignSelf: "center"
                  }}
                />
              </View>

              <Text
                style={{
                  marginStart: 10,
                  color: Colors.black,
                  fontFamily: "OpenSans-Bold"
                }}
              >
                JOHN SCHOFFER
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: Colors.colorLine,
                borderBottomWidth: 1
              }}
            />
            <TextInput
              placeholder="Write a post,share link or picture..."
              style={{ marginStart: 10, marginEnd: 10 }}
              underlineColorAndroid={Colors.transparent}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flex: 1,
              borderTopColor: Colors.colorLine,
              width: "100%",
              borderTopWidth: 1,
              alignItems: "center"
            }}
          >
            <View
              style={[
                styles.row,
                {
                  marginStart: 10,
                  marginEnd: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 10
                }
              ]}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold",
                    marginEnd: 10,
                    fontSize: 16
                  }}
                >
                  @
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: "OpenSans-Bold",
                    marginEnd: 10,
                    fontSize: 16
                  }}
                >
                  #
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.pickSingleWithCamera(true, true)}
              >
                <Image
                  source={Icons.ic_camera_profile}
                  style={[styles.icon, {}]}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: Colors.bgHeader,
                    borderRadius: 5
                  }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      padding: 5,
                      fontFamily: "OpenSans-Bold",
                      marginStart: 10,
                      marginEnd: 10
                    }}
                  >
                    Post
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AddPostScreen;