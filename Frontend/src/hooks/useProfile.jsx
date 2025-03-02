import { useState, useEffect } from "react";
import axios from "axios";

export default async function useProfile() {
  const [isLogin, setisLogin] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setisLogin(false);
      return;
    } else {
      setisLogin(true);
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  return { isLogin, user, error };
}
