// @ts-nocheck
import {
  createCon,
  updateActiveCon,
  sendMsg,
  invite,
} from "../controllers/chat.js";
import { subscribeListCon, activeCon } from "../models/chat.js";
import { authedUser } from "../models/auth.js";
const content = `
<div class="d-flex h-100 w-100">
        <div class=" flex-grow-1 card shadow md-only scroll" id="js-listConPanel">
            <form id="js-formCreateCon" class="form-inline">
                        <div class="form-group">
                            <input type="text" id="txtConName" placeholder="Create a conversation" class="w-100 form-control">
                        </div>
                        <div class="form-group  no-grow">
                            <button class="btn btn-primary">Create</button>
                        </div>
            </form>
            <ul id="js-ListCon" class="no-bullet"></ul>
        </div>
        <div class=" flex-grow-4 d-flex column card">
                <div class="p-12 bg-primary">
                    <button class="btn btn-primary md-only-visible" id="js-btnShowListCon">Show</button>
                    <span id="js-conTitle"></span>
                </div>
                <div class=" d-flex flex-grow-1 scroll">
                    <div class=" flex-grow-3 d-flex column">
                        <div class=" flex-grow-1 scroll" id="js-listMessage">

                        </div>
                        <form class="form-inline" id="js-chatForm">
                        
                                <div class="form-group">
                                    <input type="text" class="w-100 form-control" id="message">
                                </div>
                                <div class="form-group no-grow">
                                    <button class="btn btn-primary">Send</button>
                                </div>
                        </form>
                    </div>
                    <div class=" flex-grow-1 card">
                    <form id="js-inviteForm" class="form-inline">
                        
                                <div class="form-group">
                                    <input type="text" id="email" placeholder="Enter email to add" class="w-100 form-control">
                                </div>
                                <div class="form-group no-grow">
                                    <button class="btn btn-primary">Add</button>
                                </div>
                    
                    </form>
                        <ul id="js-listMember"></ul>
                    </div>
                </div>
        </div>
    </div>
`;

function onload() {
  subscribeListCon();
  const formCreateCon = document.getElementById("js-formCreateCon");
  formCreateCon.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = formCreateCon.txtConName.value;
    try {
      const success = createCon(name);
    } catch (err) {
      alert(err.message);
    }
  });
  const formChat = document.getElementById("js-chatForm");
  formChat.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
      sendMsg(formChat.message.value);
      formChat.message.value = "";
    } catch (err) {
      alert(err.message);
    }
  });
  const formInvite = document.getElementById("js-inviteForm");
  formInvite.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = formInvite.email.value;
    try {
      invite(email);
    } catch (err) {
      alert(err.message);
    }
  });
}

function onConsChanges(cons) {
  const listCon = document.getElementById("js-ListCon");
  listCon.innerHTML = "";
  console.log(cons);
  cons.forEach((con) => {
    const conLi = document.createElement("li");
    conLi.innerHTML = con.name;
    conLi.dataset.id = con.id;
    conLi.classList.add("list-item");
    if (con.id === activeCon) {
      conLi.classList.add("active");
    }
    conLi.addEventListener("click", function () {
      updateActiveCon(con.id);
    });
    listCon.appendChild(conLi);
  });
}

function onActiveConChange(con) {
  const listConLi = document.querySelectorAll("#js-ListCon > li");
  listConLi.forEach((conLi) => {
    if (conLi.dataset.id !== con.id) {
      conLi.classList.remove("active");
    } else {
      conLi.classList.add("active");
    }
  });
  document.getElementById("js-conTitle").innerText = con.name;
  updateListMember(con.list_member);
}

function updateListMember(listEmail) {
  const listMember = document.getElementById("js-listMember");
  listMember.innerHTML = "";
  listEmail.forEach((email) => {
    const memberLi = document.createElement("li");
    memberLi.innerText = email;
    listMember.appendChild(memberLi);
  });
}

function onActiveConUpdate(con) {
  updateListMember(con.listMember);
}

function onMessagesChanges(messages) {
  const listMessage = document.getElementById("js-listMessage");
  listMessage.innerHTML = "";
  messages.forEach(function (msg) {
    // WAY1 (SHOULD USE)
    // const msgDiv = document.createElement("div");
    // WAY2
    const algin = msg.sender === authedUser ? "flex-end" : "flex-start";
    const color = msg.sender === authedUser ? "msg-primary" : "msg-secondary";
    const msgHtml = `<div class="d-flex ${algin}"><span class="${color}  msg">${msg.content}</span></div>`;
    listMessage.insertAdjacentHTML("beforeend", msgHtml);
  });
}

export default {
  content: content,
  onload: onload,
  onConsChanges: onConsChanges,
  onActiveConChange: onActiveConChange,
  onMessagesChanges: onMessagesChanges,
  onActiveConUpdate: onActiveConUpdate,
};
