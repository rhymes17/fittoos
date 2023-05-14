import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setIsChecking(false);
  }, [user]);

  return { loggedIn, isChecking };
};

export default useAuthStatus;
