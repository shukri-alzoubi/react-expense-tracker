import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import { authI } from "../firebase/config";
import LoadingPage from "../components/layout/Loading";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthProvider = ({ children }) => {
    /** @type {[import("firebase/auth").User]} */ const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastSessionUpdate, setLastSessionUpdate] = useState(Date.now());

    // Watch User Changes
    useEffect(() => {
        const unsub = onAuthStateChanged(authI, (nUser) => {
            setUser(nUser);
            setLoading(false);
            setLastSessionUpdate(Date.now());
        });

        return () => unsub();
    }, []);

    // Login
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(authI, email, password);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Create User
    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(authI, email, password);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }


    // Sign In With Google
    const googleSignIn = async () => {
        try {
            await signInWithPopup(authI, googleProvider);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Sign In With Facebook
    const facebookSignIn = async () => {
        try {
            await signInWithPopup(authI, facebookProvider);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Sign In With Github
    const githubSignIn = async () => {
        try {
            await signInWithPopup(authI, githubProvider);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    //  Sign out
    const logout = async () => {
        try {
            await signOut(authI);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Send Email Verification
    const verifyEmail = async () => {
        try {
            if (!user) throw new Error('user-not-found');
            if (user.emailVerified) throw new Error('user-already-verified');

            await sendEmailVerification(user);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }


    // Update Dislay Name
    const updateDisplayName = async (displayName) => {
        try {
            if (!user) throw new Error('user-not-found');
            await updateProfile(user, { displayName: displayName });
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error)
            return false;
        }
    }

    // Reauthenticate user via password
    const reauthenticate = async (password, callback) => {
        try {
            if (!user) throw new Error('user-not-found');
            if(user.email === 'demo@demo.com'){return false;}
            const credintial = EmailAuthProvider.credential(user.email, password);
            let cred = await reauthenticateWithCredential(user, credintial);
            setLastSessionUpdate(Date.now());

            if(callback){return callback(cred.user);}
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Send Password Reset to Email
    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(authI, email);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Update Password
    const updateUserPassword = async (currentPassword, newPassword) => {
        try {
            if (!user) throw new Error('user-not-found');
            if (!(await reauthenticate(currentPassword))) throw new Error('wrong-password');

            await updatePassword(user, newPassword);
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Update Email
    const updateUserEmail = async (password, newEmail) => {
        try {
            if (!user) throw new Error('user-not-found');
            if (!(await reauthenticate(password))) throw new Error('wrong-password');

            await updateEmail(user, newEmail)
                .catch(() => { console.log('✅ Verification was sent to new email') });
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    // Delete Account
    const deleteAccount = async (password) => {
        try {
            if (!user) throw new Error('user-not-found');
            if (!(await reauthenticate(password))) throw new Error('wrong-password');

            await deleteUser(user)
                .catch(() => { console.log('🗑️ Verification was sent to email') });
            setLastSessionUpdate(Date.now());
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    const handleError = (error) => {
        let nError = 'something went wrong';

        if (error.toString().includes('invalid-credential')) {
            nError = 'wrong email or password'
        }

        if (error.toString().includes('email-already-in-use')) {
            nError = 'this email is already in use'
        }

        console.log(error);
        throw new Error(nError)
    }

    const values = {
        user,
        loading,
        login,
        signUp,
        googleSignIn,
        facebookSignIn,
        githubSignIn,
        logout,
        verifyEmail,
        updateDisplayName,
        sendPasswordReset,
        updateUserPassword,
        updateUserEmail,
        deleteAccount,
        lastSessionUpdate,
        reauthenticate,
    }

    return (<AuthContext.Provider value={values}>
        {loading && <div className="h-100"><LoadingPage/></div>}
        {!loading && children}
    </AuthContext.Provider>)
}

/**
 * Use Ref Hook
 * @returns {{
 *  user: import('firebase/auth').User,
 *  lastSessionUpdate: Number | null,
 *  loading: Boolean,
 *  clearError: ()=> void,
 *  login: (email: String, password: String)=> Promise<Boolean>,
 *  signUp: (email: String, password: String)=> Promise<Boolean>,
 *  googleSignIn: () => Promise<Boolean>,
 *  facebookSignIn: () => Promise<Boolean>,
 *  githubSignIn: () => Promise<Boolean>, 
 *  logout: () => Promise<Boolean>,
 *  verifyEmail: () => Promise<Boolean>,
 *  sendPasswordReset: (email: String) => Promise<Boolean>,
 *  updateUserPassword: (currentPassword: String, newPassword: String) => Promise<Boolean>,
 *  updateDisplayName: (displayName: String) => Promise<Boolean>,
 *  updateUserEmail: (password: String, newEmail: String) => Promise<Boolean>,
 *  reauthenticate: (password: String, callback: (user: import("firebase/auth").User | null)=> Promise<Boolean>) => Promise<Boolean>,
 *  deleteAccount: (password: String) => Promise<Boolean>,
 * }}
 */
export const useAuth = () => useContext(AuthContext)