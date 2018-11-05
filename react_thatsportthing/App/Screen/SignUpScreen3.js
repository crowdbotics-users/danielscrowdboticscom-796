import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

class SignUpScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
    };
  }
  static navigationOptions = {
    header: null
  };

  //redirect home page

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doBack(){
    this.props.navigation.goBack();
  }
  imageClick() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchImageLibrary(options, (response) => {


      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          avatarSource: response.uri
        });
      }
    });
  }
  cameraClick() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchCamera(options, (response) => {


      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          avatarSource: response.uri
        });
      }
    });
  }
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }
  pickSingle(cropit, circular=true) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true,
    }).then(image => {
      this.setState({
        avatarSource: image.path
      });
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      alert(e.message ? e.message : e);
    });
  }

  render() {
    return (
      
      <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoView}>
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={Icons.logo_white} />
          </View>
        </View>
        <View style={styles.uploadView}>
          <View style={styles.customUploadView}>
            <View style={styles.uploadImageView}>
              <ImageBackground
                style={{ height: 180, width: 180 ,justifyContent:'center' }}
                source={Icons.ic_upload_image_bg}
              >
              <Image source={{uri:this.state.avatarSource}}  style={{ height: 170, width: 170,borderRadius:85,alignSelf:'center'}}/>
              </ImageBackground>
            </View>
            <View>
              <Text style={[styles.text, { marginTop: 10 }]}>
                CHOOSE YOUR PROFILE PICTURE
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.uploadTypeSelectView}>
        <TouchableOpacity onPress={() => this.pickSingle(true)}>
          <View style={styles.galleryView}>
            <Image
              style={{ height: 60, width: 60 }}
              source={Icons.ic_upload_image}
            />
            <Text style={styles.text}>UPLOAD</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
          <View style={styles.cameraView}>
            <Image
              style={{ height: 60, width: 60, alignItems: "center" }}
              source={Icons.ic_camera}
            />
            <Text style={styles.text}>TAKE A PICTURE</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center",marginBottom:5 }}>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doBack.bind(this)}>
              <View style={styles.backbutton}>
                <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>BACK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
              <View style={styles.button}>
                <Text style={[styles.nextbuttonText,{fontFamily:'JosefinSans-Bold'}]}>DONE!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    flex: 1
  },
  logoView: { flex: 1, marginTop: 30 },
  logo: { flex: 1,marginLeft:30},
  logoImage: { height: 90, width: 137 },
  uploadView: {
    flex: 2,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  customUploadView: {
    flexDirection: "column",
    justifyContent: "center"
  },
  uploadImageView: {
    alignItems: "center",
    justifyContent: "center"
  },
  uploadTypeSelectView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  galleryView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  },
  cameraView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  buttonView: { flex: 1, justifyContent: "flex-end", alignItems: "flex-end" },
  button: {
    marginBottom: "10%",
    backgroundColor: Colors.white,
    marginLeft:10,
   width:Dimensions.get('screen').width/2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  backbutton: {
    marginBottom: "10%",
    marginRight:10,
    borderWidth:2,
    width:Dimensions.get('screen').width/2,
    borderColor:Colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  nextbuttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.orange
  },
  text: { color: Colors.white, textAlign: "center", marginTop: 5 ,fontFamily:'OpenSans-SemiBold'},
  buttonText: {
    textAlign:'center',
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  }
});
export default SignUpScreen3;
