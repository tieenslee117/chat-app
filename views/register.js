//@ts-nocheck
import setScreen from "../index.js";
import loginScreen from "./login.js";
import { register } from "../controllers/auth.js";
const registerScreen = `
<div class="d-flex align-items-center justify-content-center h-100">
<div class="card card-form shadow">
<p class="text-center title">Register</p>
<form id="js-formRegister">
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="form-control" required>
</div>
<div class="form-group">
    <label for="name">Display name</label>
    <input type="text" id="name"  class="form-control" required >
</div>
<div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" class="form-control" required>
</div>
<div class="form-group">
    <label for="retypePassword">Confirm Password</label>
    <input type="password" id="retypePassword" class="form-control" required>
</div>
<div class="form-group">
    <button type="submit" class="btn btn-primary">Register</button>
    <button type="button" id="js-btnMoveToLogin" class="btn btn-primary">Back to login</button>
</div>

</form>
</div>
</div>
`;
function onload() {
  document.getElementById("js-btnMoveToLogin").addEventListener("click", () => {
    setScreen(loginScreen);
  });
  const form = document.getElementById("js-formRegister");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userInput = {
      email: form.email.value,
      name: form.name.value,
      password: form.password.value,
      retypePassword: form.retypePassword.value,
    };
    try {
      const result = await register(userInput);
      if (result) alert("Register successfully! Check your inbox!");
    } catch (err) {
      alert(err.message);
    }
  });
}
export default {
  content: registerScreen,
  onload: onload,
};
