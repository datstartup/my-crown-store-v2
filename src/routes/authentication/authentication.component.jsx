// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

// import {
//     auth,
//     // signInWithGooglePopup,
//     // signInWithGoogleRedirect,
//     createUserDocumentFromAuth,
// } from '../../utils/firebase/firebase.utils';

import './authentication.styles.scss';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
    // run once when the component is mounted

    // useEffect(() => {
    //     async function getRedirectAuth() {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     getRedirectAuth();
    // }, []);

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
