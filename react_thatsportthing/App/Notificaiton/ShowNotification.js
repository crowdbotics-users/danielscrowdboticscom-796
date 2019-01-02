import firebase from "react-native-firebase";
// Optional flow type
import { RemoteMessage } from "react-native-firebase";

export default async (message: RemoteMessage) => {
  // handle your message
//   console.log(message);

  const data = message.data;
  const notification = new firebase.notifications.Notification()
    .setNotificationId("notificationId")
    .setTitle(data.title)
    .setBody(data.body);

  notification.android
    .setChannelId("com.thatsportthing")
    .android.setSmallIcon("ic_launcher");
  notification.android
    .setAutoCancel(true)
    .setSound("default")
    .setTitle(data.title)
    .setBody(data.body)
    .android.setPriority(firebase.notifications.Android.Priority.Max);
    const action = new firebase.notifications.Android.Action('test_action', 'ic_launcher', data.title);
    // Add the action to the notification
    notification.android.addAction(action);
    
  firebase.notifications().displayNotification(notification);

  

  return Promise.resolve();
};
