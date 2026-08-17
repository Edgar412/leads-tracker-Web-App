
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove,
         getAuth,
         onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";
import { firebaseConfig} from "./config.js";

//database varibles
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        console.log("Logged in user ID: ", user.uid);
    }
})

const database = getDatabase(app)
const userLeadsRef = ref(database, 'users/' + user.uid + "/leads");


//progam varibales
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("dblclick", function () {
    remove(userLeadsRef);
    ulEl.innerHTML = "";
} )

inputBtn.addEventListener("click", function() {
    push(userLeadsRef, inputEl.value)
    inputEl.value = ""
})

onValue(userLeadsRef, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()

    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues);
        render(leads);
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
        console.log(listItems)
    }
    ulEl.innerHTML = listItems
}