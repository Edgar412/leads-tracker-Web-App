
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";
import { firebaseConfig} from "./config.js";

//database varibles
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads");


//progam varibales
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("dblclick", function () {
   
} )

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

onValue(referenceInDB, function(snapshot) {
    console.log(snapshot.val());
})

function renderLeads(leads) {
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