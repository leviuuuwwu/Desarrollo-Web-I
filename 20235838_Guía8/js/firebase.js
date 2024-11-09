// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUVj8Ny2VjqO5R3YNKWRVLENizG-odK_A",
    authDomain: "agenda-desarrollo-web-i-a8999.firebaseapp.com",
    projectId: "agenda-desarrollo-web-i-a8999",
    storageBucket: "agenda-desarrollo-web-i-a8999.firebasestorage.app",
    messagingSenderId: "386603292169",
    appId: "1:386603292169:web:862ff4eef32b06fcbf8ad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to register users
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado exitosamente: ', userCredential.user);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Function to log in users
export async function logInUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesión exitoso");
    } catch (error) {
        console.log("Usuario y/o contraseña errónea", error.message);
    }
}
