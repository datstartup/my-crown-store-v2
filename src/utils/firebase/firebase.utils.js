// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyCHpUDQcqXHXlx07je3ws6WM8uZCIY0BE8',

    authDomain: 'crow-store-63c9a.firebaseapp.com',

    projectId: 'crow-store-63c9a',

    storageBucket: 'crow-store-63c9a.appspot.com',

    messagingSenderId: '119806557656',

    appId: '1:119806557656:web:3c28210bd9224add9806ad',

    measurementId: 'G-QVH0VB1B4J',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// get data getting from authentication store them in firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    // check if there is a doc
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);

    // if user data exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (e) {
            console.log('error creating the user', e.message);
        }
    }

    // if user data doesn't exist

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);
