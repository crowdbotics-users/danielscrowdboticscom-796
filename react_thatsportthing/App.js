import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Main from "./Main";
import Snackbar from '@prince8verma/react-native-snackbar';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
     
          <Main />
  <Snackbar id={"root_app"}/>
      </SafeAreaView>
    );
  }
}
