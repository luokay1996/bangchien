import { db } from "./firebase.js";
import {
  doc, onSnapshot, setDoc, updateDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const TOTAL = 60;
const ADMIN_PASS = "bangchu";

const ref = doc(db, "bangchien", "main");

async function init() {
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      slots: Array(TOTAL).fill(null),
      locked: false
    });
  }

  onSnapshot(ref, render);
}

function render(snap) {
  const data = snap.data();
  document.getElementById("lockStatus").innerText =
    data.locked ? "🔒 Đã khóa" : "🔓 Đang mở";

  const teams = document.getElementById("teams");
  teams.innerHTML = "";

  for (let t = 0; t < 10; t++) {
    const div = document.createElement("div");
    div.className = "team";
    div.innerHTML = `<div class="team-title">Team ${t+1}</div>`;

    const slots = document.createElement("div");
    slots.className = "slots";

    for (let i = 0; i < 6; i++) {
      const idx = t*6 + i;
      const s = document.createElement("div");
      s.className = "slot";

      if (data.slots[idx]) {
        s.classList.add("filled", data.slots[idx].class);
        s.innerText = data.slots[idx].name;
      } else {
        s.innerText = data.locked ? "Đã khóa" : "Chọn";
        if (!data.locked) {
          s.onclick = () => choose(idx);
        }
      }

      slots.appendChild(s);
    }

    div.appendChild(slots);
    teams.appendChild(div);
  }
}

async function choose(index) {
  const name = nameInput.value.trim();
  const cls = classInput.value;
  if (!name || !cls) return alert("Thiếu thông tin");

  const snap = await getDoc(ref);
  const data = snap.data();
  if (data.slots[index]) return alert("Slot đã có");

  data.slots[index] = { name, class: cls };
  await updateDoc(ref, { slots: data.slots });
}

window.toggleLock = async () => {
  if (adminPass.value !== ADMIN_PASS) return alert("Sai mật khẩu");
  const snap = await getDoc(ref);
  await updateDoc(ref, { locked: !snap.data().locked });
};

init();
