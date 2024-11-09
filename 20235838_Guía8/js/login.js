import { registerUser, logInUser } from "./firebase.js";

document.getElementById("loginForm").addEventListener("submit", async(e)=>{
    e.preventDefault();
})

document.getElementById("registerForm").addEventListener("submit", async(e)=>{
    e.preventDefault();
    let correo= document.getElementById("registerEmail").value;
    let password= document.getElementById("registerPassword").value;
    let firstName= document.getElementById("firstName").value;
    let lastName= document.getElementById("lastName").value;
    alert(firstName+" "+lastName);
})