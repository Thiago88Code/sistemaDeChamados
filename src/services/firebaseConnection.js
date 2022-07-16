import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"




const firebaseConfig = {
    apiKey: "AIzaSyAanD4T8lwM5zEaa2IrYdDATx15ZC1mK-8",
    authDomain: "sistema-b82ae.firebaseapp.com",
    projectId: "sistema-b82ae",
    storageBucket: "sistema-b82ae.appspot.com",
    messagingSenderId: "600528415982",
    appId: "1:600528415982:web:cf1710021c32c97ade17ff",
    measurementId: "G-YJ5D5Z9ERG"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }
  export default firebase