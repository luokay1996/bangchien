import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_PASSWORD = "14735982"; // đổi nếu muốn

const docRef = doc(db, "bangchien", "main");

const statusEl = document.getElementById("status");
const teamsEl = document.getElementById("teams");
const nameInput = document.getElementById("nameInput");

document.getElementById("registerBtn").onclick = async () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Nhập tên");

  await updateDoc(docRef, {
    slots: arrayUnion(name)
  });

  nameInput.value = "";
};

document.getElementById("lockBtn").onclick = async () => {
  if (document.getElementById("adminPass").value !== ADMIN_PASSWORD)
    return alert("Sai mật khẩu");

  await updateDoc(docRef, { locked: true });
};

document.getElementById("unlockBtn").onclick = async () => {
  if (document.getElementById("adminPass").value !== ADMIN_PASSWORD)
    return alert("Sai mật khẩu");

  await updateDoc(docRef, { locked: false });
};

onSnapshot(docRef, (snap) => {
  const data = snap.data();
  statusEl.innerText = data.locked ? "⛔ Đã khóa slot" : "🟢 Đang mở đăng ký";

  teamsEl.innerHTML = "";
  data.slots.forEach((name, i) => {
    const div = document.createElement("div");
    div.className = "team";
    div.innerText = `${i + 1}. ${name}`;
    teamsEl.appendChi
