import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAuth,
        signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";
import { firebaseConfig} from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            errorMsg.textContent = error.message;
        });
});