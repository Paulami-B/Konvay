import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type SignUpProps = {
    name: string,
    email: string,
    password: string
}
export const signup = async ({email, password, name}: SignUpProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user)
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email login successful:", userCredential.user);
    return userCredential.user;
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
    console.log("Google login successful:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};