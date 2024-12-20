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

    const status = await registerUser(correo, password, firstName, lastName);
    if(status){
        alert("Usuario creado exitosamente");
    }
    else {
        alert("Ya existe un usuario asociado a este correo");
    }
});