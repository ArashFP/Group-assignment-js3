'use client'

import { auth } from "@/firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, _user => {
            setUser(_user)
            setAuthReady(true)
        })

        return () => unsub()
    }, [])


    const value = {
        user,
        authReady
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be inside an AuthcontextProvider')

    return context
}