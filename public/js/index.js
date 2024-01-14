/* eslint-disable */
import "@babel/polyfill";
// import { displayMap } from "./mapbox";
import { login } from "./login";

console.log("index.js has been added to bundle and should be accessible!");

//DOM Elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form");

// Values

// Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // displayMap(locations);
  console.log(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
