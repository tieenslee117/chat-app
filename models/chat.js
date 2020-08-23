// @ts-nocheck
import { authedUser } from "./auth.js";
import chatScreen from "../views/chat.js";

let conversations = [];
let messages = [];
let activeCon = "";
let msgListener = () => {};

function subscribeListCon() {
  db.collection("conversations")
    .where("list_member", "array-contains", authedUser)
    .onSnapshot(function (snapshot) {
      const cons = snapshot.docChanges();
      cons.forEach((con) => {
        const id = con.doc.id;
        const name = con.doc.data().name;
        const listMember = con.doc.data().list_member;
        if (con.type === "added") {
          conversations.push({
            ...con.doc.data(),
            id: id,
            // name : name,
            // listMember : listMember
          });
        } else if (con.type === "modified") {
          conversations = conversations.map(function (conversation) {
            if (conversation.id === id) {
              const updatedConversation = {
                id: id,
                name: name,
                listMember: listMember,
              };
              if (conversation.id === activeCon) {
                chatScreen.onActiveConUpdate(updatedConversation);
              }
              return updatedConversation;
            }
            return conversation;
          });
        }
      });
      notifyConversationsChanges();
    });
}

function changeActiveCon(nextConId) {
  if (nextConId !== activeCon) {
    activeCon = nextConId;
    chatScreen.onActiveConChange(
      conversations.find(function (con) {
        return con.id === nextConId;
      })
    );
  }

  msgListener();
  notifyMessagesChanges();
  messages = [];
  msgListener = db
    .collection("messages")
    .where("conversation_id", "==", activeCon)
    .orderBy("send_at")
    .onSnapshot(function (snapshot) {
      const msgs = snapshot.docChanges();
      msgs.forEach((msg) => {
        if (msg.type === "modified") return;
        // const id = msg.doc.id;
        // const content = msg.doc.data().content;
        // const sender = msg.doc.data().sender;
        // const con_id = msg.doc.data().conversation_id;
        messages.push({
          ...msg.doc.data(),
          id: msg.doc.id,
        });
      });
      notifyMessagesChanges();
    });
}

function notifyConversationsChanges() {
  chatScreen.onConsChanges(conversations);
}

function notifyMessagesChanges() {
  chatScreen.onMessagesChanges(messages);
}

export { subscribeListCon, changeActiveCon, activeCon };
