import { auth } from "@/firebase/config";
import axios from "axios";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

type SignUpProps = {
    name: string,
    email: string,
    password: string
}
export const signup = async ({email, password, name}: SignUpProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserLocalPersistence);
      const user = userCredential.user
      console.log(user)
      const idToken = await user.getIdToken();
      console.log("Incoming ID Token:", idToken);
      await axios.post("/api/session", {
        idToken
      })
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.error('Email not registered.');
      } else if (error.code === "auth/invalid-credential") {
        alert("Email or password is incorrect.");
      } else {
        alert("Login error: " + error);
      }
    }
};

type SignInProps = {
    email: string,
    password: string
}
export const signin = async ({email, password}: SignInProps) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    console.log(user)
    const idToken = await user.getIdToken();
    console.log("Incoming ID Token:", idToken);
    await axios.post("/api/session", {
      idToken
    });
    console.log("Session cookie set and user signed in:", user.uid);
  } catch (error:any) {
    if (error.code === 'auth/invalid-credential') {
      console.error('Incorrect email or password');
    } else {
      console.error('Login failed:', error.message);
    }
  }
};

const googleProvider = new GoogleAuthProvider();

export const signinWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await setPersistence(auth, browserLocalPersistence);
    const user = result.user
    console.log(user)
    const idToken = await user.getIdToken();
    console.log("Incoming ID Token:", idToken);
    await axios.post("/api/session", {
      idToken
    })
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};