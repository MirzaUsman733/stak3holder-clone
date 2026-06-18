import { useEffect, useState } from "react";

const STORAGE_KEY = "streakx_fake_auth";
const AUTH_EVENT = "streakx_fake_auth_change";

function readLoggedIn() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) !== "0";
}

export function useFakeAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(readLoggedIn);

  useEffect(() => {
    const sync = () => setIsLoggedIn(readLoggedIn());
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
    localStorage.setItem(STORAGE_KEY, "0");
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return { isLoggedIn, login, logout };
}
