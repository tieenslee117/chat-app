import setScreen from "../index.js";
import registerScreen from "./register.js";
// const loginScreen = `
// <div class="d-flex h-100 justify-content-center align-items-center">
//     <div class="card shadow">
//         <div class="text-center">Login</div>
//         <form id="js-formLogin">
//         <div class="form-group">
//             <label for="email">Email</label>
//             <input type="email" id="email" class="form-control">
//         </div>
//         <div class="form-group">
//             <label for="password">Password</label>
//             <input type="password" id="password" class="form-control">
//         </div>
//         <div class="form-group">
//             <button type="submit" class="btn btn-primary">Login</button>
//             <button type="button" class="btn btn-primary" id="js-btnBackToRegister">Back to Register</button>
//         </div>
//         </form>
//     </div>
// </div>
// `;
const loginScreen = `
<img class="wave" src="img/wave.png" />
    <div class="container">
      <div class="img">
        <img src="img/background.svg" />
      </div>
      <div class="login-content">
        <form action="index.html">
          <img src="img/avatar.svg" />
          <h2 class="title">Welcome</h2>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <h5>Email</h5>
              <input type="text" class="input" id="email" required/>
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
          <a href="" id="js-btnMoveRegister">Register</a>
          <button type="submit" class="btn">Login</button>
        </form>
      </div>
    </div>
    <script type="text/javascript" src="script.js"></script>
`;

function onload() {
  document
    .getElementById("js-btnMoveRegister")
    .addEventListener("click", (e) => {
      e.preventDefault();
      setScreen(registerScreen);
    });
}

export default {
  content: loginScreen,
  onload: onload,
};
