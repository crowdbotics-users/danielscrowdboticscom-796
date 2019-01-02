import firebase from 'react-native-firebase';
// Optional flow type
import type { NotificationOpen } from 'react-native-firebase';

export default async (notificationOpen: NotificationOpen) => {
    console.log('notificationOpen',notificationOpen);
    

    return Promise.resolve();
}