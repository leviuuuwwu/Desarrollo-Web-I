import { registerUser } from "./firebase.js"
import { logInUser } from "./firebase.js"

async function register(){
    await registerUser("jl434465@gmail.com", "123456")
}

async function login(){
    await logInUser("jl434465@gmail.com", "123456")
}
//register()
login()