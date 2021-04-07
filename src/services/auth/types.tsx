import AuthCode from "./authCode";
import firebase from "firebase";

export type authProps = {
    email: string;
    password: string;
};

export type AuthResponse = {
    code: AuthCode;
    message: string;
};

export type UserContextProps = {
    currentUser: firebase.User | null;
    handleLogin: ({email, password}: authProps) => Promise<AuthResponse>,
    handleRegister: ({email, password}: authProps) => Promise<AuthResponse>,
    handleLoginWithGoogle: () => Promise<AuthResponse>,
    handleSignOut: () => Promise<AuthResponse>,
}
