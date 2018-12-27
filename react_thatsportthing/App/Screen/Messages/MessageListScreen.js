import React, { PureComponent } from "react";
import { View, SafeAreaView, Text } from "react-native";
import MessageListHeaderComponent from "../../Compoments/HeaderCompoments/MessageListHeaderCompoment";

class MessageListScreen extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <MessageListHeaderComponent
          {...props}
          props={navigation}
          isProfile={true}
        />
      )
    };
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <Text>MessageListScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default MessageListScreen;
