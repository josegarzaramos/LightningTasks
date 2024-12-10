import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
      } else {
        setUser(null);
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, userId, loading };
};

export default useAuth;
