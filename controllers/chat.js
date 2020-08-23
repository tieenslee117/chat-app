//@ts-nocheck
import { authedUser } from "../models/auth.js";
import { changeActiveCon, activeCon } from "../models/chat.js";

function createCon(name) {
  db.collection("conversations")
    .doc()
    .set({
      name: name,
      list_member: [authedUser],
    });
}

function updateActiveCon(nextConId) {
  changeActiveCon(nextConId);
}

function sendMsg(msg) {
  if (msg.length <= 0) {
    throw new Error("Message empty!!!");
  }
  if (!Boolean(activeCon)) {
    throw new Error("Choose a conversation!!!");
  }
  db.collection("messages").doc().set({
    content: msg,
    sender: authedUser,
    conversation_id: activeCon,
    send_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function invite(email) {
  if (!email) {
    throw new Error("Email cannot be empty!!!");
  }
  if (!activeCon) {
    throw new Error("Choose a conversation!!!");
  }
  console.log(activeCon);
  db.collection("conversations")
    .doc(activeCon)
    .update({
      list_member: firebase.firestore.FieldValue.arrayUnion(email),
    });
}

export { createCon, updateActiveCon, sendMsg, invite };
