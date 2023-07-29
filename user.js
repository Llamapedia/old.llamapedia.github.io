  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDGk7YK6wRwhp_vD-vp9wvu2BeNw3aqEpE",
    authDomain: "urbosastits.firebaseapp.com",
    projectId: "urbosastits",
    storageBucket: "urbosastits.appspot.com",
    messagingSenderId: "500673092480",
    appId: "1:500673092480:web:8ac995d8a9f7d19e81bf65"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  console.log(app.apiKey);