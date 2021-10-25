import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextData } from "../@types/authContextData";
import { AuthResponse } from "../@types/authentication";
import { User } from "../@types/user";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode
}

export function AuthProvider ({children}: AuthProvider) {  
  const signInUrl = "https://github.com/login/oauth/authorize?scope=user&client_id=396890eecadcc0f95be1";

  const [ user, setUser ] = useState<User | null>(null);

  async function signIn (code: string) {
    let { data } = await api.post<AuthResponse>("authenticate", { code });

    let { token, user } = data;

    localStorage.setItem("token", token);
    
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut () {
    setUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/user").then(({data}) => setUser(data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const [baseUrl, code] = url.split("?code=");

      window.history.pushState({}, '', baseUrl);

      signIn(code);
    }
  }, []);

  
  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}