import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAZqlOp2LNk6JWS0xOsaqBYyyRXCPxtubo",
    authDomain: "salvatatas.firebaseapp.com",
    databaseURL: "https://salvatatas.firebaseio.com",
    projectId: "salvatatas",
    storageBucket: "salvatatas.appspot.com",
    messagingSenderId: "156944345850",
    appId: "1:156944345850:web:f096613dd94da5cc0a7743"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
