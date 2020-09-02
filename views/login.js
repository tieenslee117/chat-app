//@ts-nocheck
import registerScreen from "./register.js";
import setScreen from "../index.js";
import { login } from "../controllers/auth.js";
import chatScreen from "./chat.js";
const loginScreen = `
<div class="d-flex h-100 justify-content-center align-items-center">
    <div class="card card-form shadow">
        <div class="text-center title">Login</div>
        <form id="js-formLogin">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" class="btn btn-primary" id="js-btnBackToRegister">Back to Register</button>
        </div>
        </form>
    </div>
</div>
`;
function onload() {
  document
    .getElementById("js-btnBackToRegister")
    .addEventListener("click", () => {
      setScreen(registerScreen);
    });
  const formLogin = document.getElementById("js-formLogin");
  console.log(formLogin);
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = formLogin.email.value;
    const password = formLogin.password.value;

    const payload = { email: email, password: password };

    try {
      const success = await login(payload);
      if (success) {
        alert("login success");
        setScreen(chatScreen);
      }
    } catch (err) {
      alert(err.message);
    }
  });
}
export default {
  content: loginScreen,
  onload: onload,
};
