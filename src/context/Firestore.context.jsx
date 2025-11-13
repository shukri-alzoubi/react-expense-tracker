import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../components/layout/Loading";
import { useAuth } from "./Auth.context";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { dbI } from "../firebase/config";
import transList from '../data/mock_transactions.json';
import { dateNow } from "../utils/helper";

const FirestoreContext = createContext(null);

/**@typedef {'transactions' | 'userInfo'} FieldLabel */

/** 
 * @typedef {{transactions: Array<import('../models/Transaction.model').Transaction>, userInfo: * }} DataType 
 * 
 * */

export const FirestoreProvider = ({ children }) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({});

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(dbI, `users/${user.uid}`), initialize);
            return () => unsub();
        } else {
            setLoading(false)
        }

        // eslint-disable-next-line
    }, [user]);

    /**
     * Initialize Data
     * @param {DocumentSnapshot<DocumentData, DocumentData>} snapshot 
     */
    const initialize = async (snapshot) => {

        try {
            let userRef = doc(dbI, `users/${user.uid}`);
            if (!snapshot.exists()) { await setDoc(userRef, { transactions: [], settings: {}, userInfo: {} }) }
            else if (!snapshot.data()?.transactions) {
                await updateDoc(userRef, { transactions: [] })
            }
            else if (!snapshot.data()?.settings) { await updateDoc(userRef, { settings: {} }) }

            // Create User Info Object
            const userInfo = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                phoneNumber: user.phoneNumber,
                photoURL: user?.photoURL,
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
            }

            await updateDoc(userRef, { userInfo: userInfo });
            let data = snapshot.data() ?? {};
            
            // Check Demo Mode
            if (user.email === 'demo@demo.com') {
                data = {
                    ...data, transactions: transList.map((trns) => {
                        let tDate = new Date(trns.date);
                        tDate.setFullYear(dateNow().getFullYear());
                        trns.date = tDate;
                        return trns;
                    })
                }
            }
            setData(data)
        } catch (error) {
            console.log('Firebase Custom Error (intialize:Firestore.context): ' + error);
        }

        setLoading(false);

    }

    /**
     * @param {Object} options 
     * @param {FieldLabel} options.field
     * @param {FieldLabel} options.field
     * @param {*} options.data
     * @param {String} options.args
     */
    const updateField = async (options = {}) => {
        if (!user || !options.field || !options.data) return null;

        try {
            let userRef = doc(dbI, `users/${user.uid}`);
            await updateDoc(userRef, { [options.field]: options.data });
            return true;
        } catch (error) {
            console.log('Firebase Custom Error (updateField:Firestore.context): ' + (options.args ?? '') + error);
            return false;
        }
    }
    /**
     * 
     *  @param {FieldLabel} field
     *  @param {FieldLabel} field
     * @returns {import("firebase/firestore").DocumentData}
     */

    const getField = async (field) => {
        if (!user || !field) return null;

        try {
            let userRef = doc(dbI, `users/${user.uid}`);

            return (await getDoc(doc(userRef))).data()[field];;
        } catch (error) {
            console.log('Firebase Custom Error:  (getField:Firestore.context): ' + error);
            return null;
        }

    }

    const values = {
        data,
        getField,
        initialize,
        updateField,
    }

    return <FirestoreContext.Provider value={values}>
        {(loading) && <div className="h-100"><LoadingPage /></div>}
        {(!loading) && children}
    </FirestoreContext.Provider>
}


/**
 * 
 * @returns {{
 *  data  : DataType,
 *  updateField: (optins: {field: FieldLabel, data: *}) => Promise<boolean>
 *  updateField: (optins: {field: FieldLabel, data: *}) => Promise<boolean>
 *  getField: (field: FieldLabel) => Promise<boolean>
 *  getField: (field: FieldLabel) => Promise<boolean>
 * }}
 */
export const useFirestore = () => useContext(FirestoreContext);


