import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// ウェブアプリのFirebase設定
const firebaseConfig = {
  apiKey: "AIzaSyCBqTiukY2syK4_3dF8KWtuPL70Oq8_-Dc",
  authDomain: "ojakotypinggame.firebaseapp.com",
  projectId: "ojakotypinggame",
  storageBucket: "ojakotypinggame.appspot.com",
  messagingSenderId: "1038247823665",
  appId: "1:1038247823665:web:b1bf1038ed3c149558c810"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export { app, auth, githubProvider, googleProvider };