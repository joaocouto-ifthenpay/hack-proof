//<div id="avatar"></div>
// document.getElementById('avatar_user').innerHTML = "<img style='margin-top: -20%; margin-bottom: -1%;' src='https://lh3.googleusercontent.com/a/AGNmyxb0N9vO4S9IzBHye2m7PE_F27R3JO2KkiowZAmM=s96-c' alt='Avatar do utilizador' class='login__logo'>";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional´

const firebaseConfig = {
    /**
     * Copy & Paste Firebase Credentials
     */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

googleBtn.addEventListener('click', (e) => {
    // signInWithRedirect(auth, provider);
    // getRedirectResult(auth)

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // name = displayName
            // email = email
            // photo = photoURL

            alert(user.displayName);
            // const avatar = document.createElement('div');
            document.getElementById('ispgaya_logo').innerHTML = "<img src=" + user.photoURL + " alt='Avatar do utilizador' class='login__logo'>";

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            alert(errorMessage);
        });
});