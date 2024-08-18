import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../App.css';

const GoogleSignin = ({setUser}) => {
    const handleGoogleSignin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            setUser(user);
            console.log('User signed in ', user);
        }
        catch (error) {
            console.log('Error signing in', error);
        }
    }

    return (
        <div className='google-signin'>
            <button className='signin-button' onClick={handleGoogleSignin} >Sign in with Google</button>
        </div>
    )
}

export default GoogleSignin;