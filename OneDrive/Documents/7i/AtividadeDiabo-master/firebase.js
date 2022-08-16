// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

/// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQhDrNSJHJZVKoNtmlYV0wKuFrFpKcIL8",
  authDomain: "trab2607-bf482.firebaseapp.com",
  projectId: "trab2607-bf482",
  storageBucket: "trab2607-bf482.appspot.com",
  messagingSenderId: "183243795351",
  appId: "1:183243795351:web:d6bff3296cefce3dfc32d2"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
