import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUserInfo(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { userInfo, loading };
};

export default useAuth;