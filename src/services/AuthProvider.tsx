import React, {useContext, useEffect, useState} from "react";
import firebase from "firebase";
import {auth} from "../firebase";
import {
    authProps,
    AuthResponse,
    handleLogin,
    handleLoginWithGoogle,
    handleRegister,
    handleSignOut
} from "./authenticationService";

type UserContextProps = {
    currentUser: firebase.User | null;
    handleLogin: ({email, password}: authProps) => Promise<AuthResponse>,
    handleRegister: ({email, password}: authProps) => Promise<AuthResponse>,
    handleLoginWithGoogle: () => Promise<AuthResponse>,
    handleSignOut: () => Promise<AuthResponse>,
}

const UserContext = React.createContext<UserContextProps>({
    currentUser: null,
    handleLogin,
    handleRegister,
    handleLoginWithGoogle,
    handleSignOut
});

export const useAuth = () => {
    return useContext(UserContext)
}

type AuthProviderProps = {}
const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const {currentUser: userContext} = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(userContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setCurrentUser(u);
        });
        return unsubscribe;
    }, [])

    const value: {
        currentUser: firebase.User | null;
        handleLogin: ({email, password}: authProps) => Promise<AuthResponse>,
        handleRegister: ({email, password}: authProps) => Promise<AuthResponse>,
        handleLoginWithGoogle: () => Promise<AuthResponse>,
        handleSignOut: () => Promise<AuthResponse>,
    } = {
        currentUser,
        handleLogin,
        handleRegister,
        handleLoginWithGoogle,
        handleSignOut
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider
