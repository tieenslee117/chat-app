// @ts-nocheck

async function register(userInput) {
  for (let key in userInput) {
    if (userInput[key].length === 0) {
      throw new Error(`${key} can't be empty!`);
    }
    if (userInput.password !== userInput.password2) {
      throw new Error(`Password not matched`);
    }
  }
  await firebase
    .auth()
    .createUserWithEmailAndPassword(userInput.email, userInput.password);
  firebase.auth().currentUser.sendEmailVerification();
  return true;
}

async function login(userInput) {
  if (userInput.email.length === 0 || userInput.password === 0) {
    throw new Error("Email and password cannot be empty!");
  }
  const loginResult = await firebase
    .auth()
    .signInWithEmailAndPassword(userInput.email, userInput.password);
  if (!loginResult.user.emailVerified) {
    throw new Error("User is not verified! Please check your inbox!");
  }
  //   updateAuthedUser(login.user.email);
  return true;
}

export { register, login };
