import  firebase from 'firebase/compat/app'
import "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDoGKPegD89wFmdd2lAITQjKesiMcBPunQ",
    authDomain: "react-dapp-88c11.firebaseapp.com",
    projectId: "react-dapp-88c11",
    storageBucket: "react-dapp-88c11.appspot.com",
    messagingSenderId: "399751177116",
    appId: "1:399751177116:web:2ec19d61aada4034e81e59"
})

export const auth = app.auth()
export default app