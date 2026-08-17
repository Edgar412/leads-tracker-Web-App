
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";
import { getAuth,
         onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { firebaseConfig} from "./config.js";

//database varibles
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)

//progam varibales
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.getElementById("delete-btn")

let userLeadsRef;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        userLeadsRef = ref(database, 'users/' + user.uid + "/leads");
        setupDatabaseListener();
    }
})

function setupDatabaseListener() {
    onValue(userLeadsRef, function(snapshot) {
        if (snapshot.exists()) {
            const snapshotValues = snapshot.val();
            const leads = [];
            Object.keys(snapshotValues).forEach((key) => {
                leads.push(snapshotValues[key]);
            });
            render(leads);
        } else {
            ulEl.innerHTML = "";
        }
    });
}

deleteBtn.addEventListener("dblclick", function () {
    remove(userLeadsRef);
    ulEl.innerHTML = "";
} )

inputBtn.addEventListener("click", function() {
    if (userLeadsRef && inputEl.value.trim() !== "") {
         push(userLeadsRef, inputEl.value)
        inputEl.value = ""
    }
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}