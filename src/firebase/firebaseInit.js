import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9cZSFEP916ie6DZQWGa1X5z9_uz2KEWw",
  authDomain: "online-store-9dc9e.firebaseapp.com",
  projectId: "online-store-9dc9e",
  storageBucket: "online-store-9dc9e.appspot.com",
  messagingSenderId: "682877813062",
  appId: "1:682877813062:web:1701599dfa85b3c93da547"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp};
  export default firebaseApp.firestore();