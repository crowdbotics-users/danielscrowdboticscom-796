import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  NetInfo,
  Platform
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import ApiUrl from "../Network/ApiUrl";
import { showSnackBar } from "@prince8verma/react-native-snackbar";

class SignUpScreen3 extends Component {
 

  //redirect home page

  
  
 

  

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.logoView}>
            <View style={styles.logo}>
              <Image style={styles.logoImage} source={Icons.logo} />
            </View>
          </View>
          
          
          
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  logoView: { flex: 1, marginTop: 30 },
  logo: { flex: 1, marginLeft: "10%", marginTop: "5%" },
  logoImage: { height: 100, width: 152 },
  
});
export default SignUpScreen3;