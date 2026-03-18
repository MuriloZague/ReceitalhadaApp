import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  baseUrl: "https://receitalhadaapp-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyAIasHNhuqbMUhEWpAafB5PpvrWy20x7Js",
  authDomain: "receitalhadaapp.firebaseapp.com",
  projectId: "receitalhadaapp",
  storageBucket: "receitalhadaapp.firebasestorage.app",
  messagingSenderId: "474675599135",
  appId: "1:474675599135:web:1e122122e679b09c1d422a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;