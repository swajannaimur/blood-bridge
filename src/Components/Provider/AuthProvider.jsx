import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase.init';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


    // Create User with email password
    const createUser = (email, password, name, photo) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                })
            });
    }

    // sign in User
    const signIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // signout
    const logOut = () => {
        return signOut(auth)
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
  
        })
        return () => unsubscribe()
    }, [])

    const userInfo = {
        createUser,
        loading,
        setLoading,
        user,
        signIn,
        logOut
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;