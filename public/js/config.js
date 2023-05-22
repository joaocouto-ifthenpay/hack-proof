import { initializeApp } from 'firebase/app';
import * as admin from 'firebase-admin';
const {credential} = admin;

import { getDatabase } from "firebase/database";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, signInWithRedirect , getRedirectResult, signOut, GoogleAuthProvider } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaKkjFltk24MHTAGLZctmXtUYblGXOxUE",
    authDomain: "hack-proof-ispgaya.firebaseapp.com",
    databaseURL: "https://hack-proof-ispgaya-default-rtdb.firebaseio.com",
    projectId: "hack-proof-ispgaya",
    storageBucket: "hack-proof-ispgaya.appspot.com",
    messagingSenderId: "992546203502"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


const auth = getAuth();
const user = auth.currentUser;

document.addEventListener("DOMContentLoaded", function () {

  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
  
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  
  });
  