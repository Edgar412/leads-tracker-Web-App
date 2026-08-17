import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { firebaseConfig} from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//DOM elemnets
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const authTitle = document.getElementById("auth-title");
const errorMsg = document.getElementById("error-msg");
const toggleAuthBtn = document.getElementById("toggle-auth-btn");
const togglePrompt = document.getElementById("toggle-prompt");

let isLoginMode = true;

toggleAuthBtn.addEventListener("click", (e) => {
    e.preventDefault();
    errorMsg.textContent = "";
    isLoginMode = !isLoginMode;

    if (isLoginMode) {
        authTitle.textContent = "Log In";
        submitBtn.textContent = "Log In";
        togglePrompt.textContent = "Don't have an account?";
        toggleAuthBtn.textContent = "Sign Up";
    } else {
        authTitle.textContent = "Create Account";
        submitBtn.textContent = "Sign Up";
        togglePrompt.textContent = "Already have an account?";
        toggleAuthBtn.textContent = "Log In";
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMsg.textContent = "";


    const email = emailInput.value;
    const password = passwordInput.value;

    if (isLoginMode) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            errorMsg.textContent = error.message;
        })
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            if (error.code == "auth/weak-password") {
                errorMsg.textContent = "Password must be at least 6 characters long.";
            } else {
                errorMsg.textContent = error.message;
            }
        });
    }
});