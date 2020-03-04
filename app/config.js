import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyDYK0X1RVyZvQcP8oaoTX1pR7ftLYCA6ro",
    authDomain: "react-native-bloody.firebaseapp.com",
    databaseURL: "https://react-native-bloody.firebaseio.com",
    projectId: "react-native-bloody",
    storageBucket: "react-native-bloody.appspot.com",
    messagingSenderId: "725701817298",
    appId: "1:725701817298:web:5eb23a06ed26c32c890e0b",
    measurementId: "G-L0Q43ZJK22"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase ; 


//adb shell input keyevent 82
/*  adb -s <58KRX19109005789> reverse tcp:8081 tcp:8081
Resolve Error --->  $ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 
$ cd (path to project/android folder) && gradlew clean && cd .. && react-native run-android
$
*/
 
  
 