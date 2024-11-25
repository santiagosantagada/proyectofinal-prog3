import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
 apiKey: "AIzaSyC-6LMWjDnQh_uedkkIc3Upz2t7n5z_dpQ",
 authDomain: "proyectofinal-d1a5d.firebaseapp.com",
 projectId: "proyectofinal-d1a5d",
 storageBucket: "proyectofinal-d1a5d.firebasestorage.app",
 messagingSenderId: "91944203260",
 appId: "1:91944203260:web:8baba9ab4d5acf44413879"
};


app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
