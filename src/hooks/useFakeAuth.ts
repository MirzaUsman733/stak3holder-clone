import { useEffect, useState } from "react";

const STORAGE_KEY = "streakx_fake_auth";
const AUTH_EVENT = "streakx_fake_auth_change";

export function useFakeAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    const sync = () => setIsLoggedIn(localStorage.getItem(STORAGE_KEY) === "1");
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return { isLoggedIn, login, logout };
}
