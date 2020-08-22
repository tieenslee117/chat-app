//@ts-nocheck
import setScreen from "../index.js";
import loginScreen from "./login.js";
// const registerScreen = `
// <div class="d-flex align-items-center justify-content-center h-100">
// <div class="card shadow">
// <p class="text-center">Register</p>
// <form id="js-formRegister">
// <div class="form-group">
//     <label for="email">Email</label>
//     <input type="email" id="email">
// </div>
// <div class="form-group">
//     <label for="name">Display name</label>
//     <input type="text" id="name" required>
// </div>
// <div class="form-group">
//     <label for="password">Password</label>
//     <input type="password" id="password" required>
// </div>
// <div class="form-group">
//     <label for="retypePassword">Confirm Password</label>
//     <input type="password" id="retypePassword" required>
// </div>
// <div class="form-group">
//     <button type="submit" class="btn btn-primary">Register</button>
//     <button type="button" id="js-btnMoveToLogin" class="btn btn-primary">Back to login</button>
// </div>

// </form>
// </div>
// </div>
// `;
const registerScreen = `
<img class="wave" src="img/wave.png" />
    <div class="container">
      <div class="img">
        <img src="img/background.svg" />
      </div>
      <div class="login-content">
        <form action="index.html">
          <img src="img/avatar.svg" />
          <h2 class="title">Welcome</h2>
          <div class="input-div email">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>Email</h5>
              <input type="email" class="input" id="email" required/>
            </div>
          </div>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <h5>Username</h5>
              <input type="text" class="input" id="name" required/>
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>Password</h5>
              <input type="password" class="input" id="password" required/>
            </div>
          </div>
          <div class="input-div pass-2">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>Confirm Password</h5>
              <input type="password" class="input" id="password2" required/>
            </div>
          </div>
          <a href="" id="js-btnMoveLogin">Login</a>
          <button type="submit" class="btn">Register</button>
          
        </form>
      </div>
    </div>
`;
function onload() {
  document.getElementById("js-btnMoveLogin").addEventListener("click", (e) => {
    e.preventDefault();
    setScreen(loginScreen);
  });
}
export default {
  content: registerScreen,
  onload: onload,
};
