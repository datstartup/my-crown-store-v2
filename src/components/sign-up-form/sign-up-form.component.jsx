import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';

import FormInput from '../form-input/form-input.component';

import './sign-up-from.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', e);
            }
        }
    };

    const handleChange = (event) => {
        //get all the input info from target
        const { name, value } = event.target;
        //make change to formFields object
        //1. spread old values
        //2. set new value according the name (same as key in the formFields object)
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>

            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
