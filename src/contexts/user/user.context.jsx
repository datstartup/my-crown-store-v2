import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

// create a context with initial value
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // run a function once when the component mounted
    // in this case is to initialize auth listener

    useEffect(() => {
        const unsubcribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubcribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
