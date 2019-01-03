import React, { PureComponent } from "react";
import { View, SafeAreaView, Text, Switch } from "react-native";
import Colors from "../../Resource/Colors";

class EmailSmsNotificationScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFeedback: false
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text>Feedback Emails</Text>
              <Text>Comments and replies on your posts or comments</Text>
            </View>
            <View>
              <Switch
                onValueChange={value => this.setState({ isFeedback: value })}
                value={this.state.isFeedback}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default EmailSmsNotificationScreen;
