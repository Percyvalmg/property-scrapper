import React, {useContext, useEffect, useState} from "react";
import firebase from "firebase";
import {auth} from "../../firebase";
import {login} from "./login";
import {loginWithGoogle} from './loginWithGoogle'
import {register} from './register'
import {signOut} from './signOut'
import {UserContextProps} from "./types";
import {sendPasswordResetEmail} from "./resetPassword";

const UserContext = React.createContext<UserContextProps>({
    currentUser: null,
    handleLogin: login,
    handleRegister: register,
    handleLoginWithGoogle: loginWithGoogle,
    handleSignOut: signOut,
    sendPasswordResetEmail: sendPasswordResetEmail
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

    const value: UserContextProps = {
        currentUser,
        handleLogin: login,
        handleRegister: register,
        handleLoginWithGoogle: loginWithGoogle,
        handleSignOut: signOut,
        sendPasswordResetEmail
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider
