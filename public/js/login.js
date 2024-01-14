/* eslint-disable */
// import axios from "axios";
import { showAlert } from "./alerts";
console.log("login.js file added!");

const loginForm = document.querySelector(".form");

const login = async (email, password) => {
  console.log(email, password);
  try {
    console.log("Trying to send post request!");
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      // showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }

    console.log("This is the res: ", res);
  } catch (err) {
    // showAlert("error", err.response.data.message);
  }
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

export { login };
