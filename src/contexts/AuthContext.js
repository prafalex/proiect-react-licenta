import React,{useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'
import { getStorage, ref , uploadBytes,getDownloadURL } from "firebase/storage";

const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export  function AuthProvider({children}) {
    
    const[currentUser,setCurrentUser]=useState()
    const [loading,setLoading]=useState(true)
    const [url,setURL]=useState('')
    const storage=getStorage()

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()

    }

    function resetPass(email){
        return auth.sendPasswordResetEmail(email)
    }

    function uploadImage(image){
        
        return uploadBytes(ref(storage,`/images/${auth.currentUser.email}`),image)
        
    }
    function getImage(){

         getDownloadURL(ref(storage,`/images/${auth.currentUser.email}`)).then( url=>{ setURL(url)})
         return url
         
         
    }
    function emailUpdate(email){
        return currentUser.updateEmail(email)

    }
    function passUpdate(password){
        return currentUser.updatePassword(password)
    }
    useEffect(() => {
        const change = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return change
      }, [])
      
    const value={
        currentUser,
        login,
        signup,
        logout,
        resetPass,
        emailUpdate,
        passUpdate,
        uploadImage,
        getImage

    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading &&  children}
        </AuthContext.Provider>
    )
}
