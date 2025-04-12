import { auth } from "@/firebase/config";
import axios from "axios";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence,
  signOut
} from "firebase/auth";

type SignUpProps = {
    email: string,
    password: string,
    name: string
}


export const signup = async ({email, password, name}: SignUpProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserLocalPersistence);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log(user);
      await axios.post("/api/session", {
        idToken
      });

      //Add new user to convex db
      return ({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL || `https://avatar.iran.liara.run/public/${Math.round(Math.random()*100)}`,
      });

    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        throw new Error("Email already registered");
      } else {
        console.log("Login error: " + error);
        throw new Error("Login error");
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
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    await axios.post("/api/session", {
      idToken
    });
    console.log("Session cookie set and user signed in:", user.uid);
  } catch (error:any) {
    if (error.code === 'auth/invalid-credential') {
        throw new Error('Incorrect email or password');
    } else {
        console.error('Login failed:', error.message);
        throw new Error("Login failed");
    }
  }
};

const googleProvider = new GoogleAuthProvider();

export const signinWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await setPersistence(auth, browserLocalPersistence);
    const user = result.user;
    const idToken = await user.getIdToken();
    await axios.post("/api/session", {
      idToken
    })
    return ({
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email?.split("@")[0] || "",
      photoURL: user.photoURL || `https://avatar.iran.liara.run/public/${Math.round(Math.random()*100)}`,
    });
  } catch (error) {
    console.error("Google login error:", error);
    throw new Error("Google login error");
  }
};

export const logout = async() => {
    try {
        await signOut(auth);
        await axios.post('/api/logout', {}, {
            withCredentials: true
        });
    } catch (error) {
        throw new Error("Error while signing out");
    }
}