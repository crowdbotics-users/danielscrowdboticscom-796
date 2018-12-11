import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  NetInfo,
  AsyncStorage,
  Alert,
  SafeAreaView,
  StyleSheet,
  FlatList
} from "react-native";
import Colors from "../Resource/Colors";
import NestedScrollView from "react-native-nested-scroll-view";
class TestScreen extends PureComponent {
  getRandomData = () => {
    return new Array(100).fill("").map((item, index) => {
      return { title: "Title " + (index + 1) };
    });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <NestedScrollView>
        <View style={{height:200,width:'100%',backgroundColor:'red'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'green'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'yellow'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'blue'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'pink'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'orange'}}/>
       
        <View style={{height:200,width:'100%',backgroundColor:'red'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'green'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'yellow'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'blue'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'pink'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'orange'}}/>
       
        <View style={{height:200,width:'100%',backgroundColor:'red'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'green'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'yellow'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'blue'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'pink'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'orange'}}/>
       
        <View style={{height:200,width:'100%',backgroundColor:'red'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'green'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'yellow'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'blue'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'pink'}}/>
        <View style={{height:200,width:'100%',backgroundColor:'orange'}}/>
       
          <FlatList
            data={this.getRandomData()}
            backgroundColor={Colors.backgroundLogin}
           
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        </NestedScrollView>
      </View>
    );
  }
}

export default TestScreen;
