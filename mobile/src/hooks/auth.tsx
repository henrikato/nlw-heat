import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import Reactotron from "reactotron-react-native";

const CLIENT_ID = "5edafce2b98a2e5725e7";
const SCOPE = "read:user";
const USER_STORAGE = "@nlw-heat-mobile:user";
const TOKEN_STORAGE = "@nlw-heat-mobile:token";

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string
}

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
}

function AuthProvider ({ children }: AuthProviderProps) {
  const [ isSigningIn, setIsSigningIn ] = useState(true);
  const [ user, setUser ] = useState<User | null>(null);

  async function signIn () {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      let response = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      
      if (response.type === "success" && response.params.error !== "access_denied") {
        let { data } = await api.post<AuthResponse>("/authenticate", { code: response.params.code });
        let { user, token } = data;

        api.defaults.headers.common.authorization = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error) {
      Reactotron.log!(error);
    } finally {
      setIsSigningIn(false);
    }    
  }

  async function signOut () {
    setUser(null);
    await AsyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
  }

  useEffect(() => {
    async function loadUserData() {
      let userStorage = await AsyncStorage.getItem(USER_STORAGE);
      let token = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }
    
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }} >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };