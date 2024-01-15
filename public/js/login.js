/* eslint-disable */
// MY CODE
// import axios from "axios";
// import { showAlert } from "./alerts";
// console.log("login.js file added!");

// const loginForm = document.querySelector(".form");

// const login = async (email, password) => {
//   console.log(email, password);
//   try {
//     console.log("Trying to send post request!");
//     const res = await axios({
//       method: "POST",
//       url: "http://127.0.0.1:3000/api/v1/users/login",
//       data: {
//         email,
//         password,
//       },
//     });

//     if (res.data.status === "success") {
//       // showAlert("success", "Logged in successfully!");
//       window.setTimeout(() => {
//         location.assign("/");
//       }, 1500);
//     }

//     console.log("This is the res: ", res);
//   } catch (err) {
//     // showAlert("error", err.response.data.message);
//   }
// };

// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   login(email, password);
// });

// export { login };

// Jonas Code

import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  console.log("Entered login block.");
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password
      }
    });

    if (res.data.status != "error") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout"
    });
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
