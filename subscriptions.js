// Sélection DOM
const form = document.getElementById("subscription-form");
const memberSelect = document.getElementById("member-select");
const typeSelect = document.getElementById("type");
const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const tbody = document.getElementById("subscriptions-table-body");

// Boutons
const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const editField = document.getElementById("edit-id");

// Load members from storage
function getMembers() {
  return JSON.parse(localStorage.getItem("members")) || [];
}

// Load subscriptions
function getSubscriptions() {
  return JSON.parse(localStorage.getItem("subscriptions")) || [];
}

// Save subscriptions
function saveSubscriptions(list) {
  localStorage.setItem("subscriptions", JSON.stringify(list));
}

function generateId() {
  return "SUB-" + Date.now();
}

// Afficher membres dans le select
function populateMembersSelect() {
  const members = getMembers();
  memberSelect.innerHTML = `<option value="">Choisir un membre</option>`;
  members.forEach(m => {
    memberSelect.innerHTML += `<option value="${m.id}">${m.firstname} ${m.lastname}</option>`;
  });
}

// Ajouter un abonnement
function addSubscription() {
  const subs = getSubscriptions();
  const members = getMembers();
  const memberId = memberSelect.value;

  const memberObj = members.find(m => m.id === memberId);

  const sub = {
    id: generateId(),
    memberId,
    memberName: memberObj.firstname + " " + memberObj.lastname,
    type: typeSelect.value,
    price: parseFloat(priceInput.value),
    start: startInput.value,
    end: endInput.value
  };

  subs.push(sub);
  saveSubscriptions(subs);
  renderSubscriptions();
}

// Supprimer
function deleteSubscription(id) {
  const subs = getSubscriptions().filter(s => s.id !== id);
  saveSubscriptions(subs);
  renderSubscriptions();
}

// Préparer édition
function editSubscription(id) {
  const sub = getSubscriptions().find(s => s.id === id);

  memberSelect.value = sub.memberId;
  typeSelect.value = sub.type;
  priceInput.value = sub.price;
  startInput.value = sub.start;
  endInput.value = sub.end;

  editField.value = sub.id;
  addBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

// Mise à jour
function updateSubscription() {
  const subs = getSubscriptions().map(s => {
    if (s.id === editField.value) {
      const members = getMembers();
      const memberObj = members.find(m => m.id === memberSelect.value);
      return {
        ...s,
        memberId: memberSelect.value,
        memberName: memberObj.firstname + " " + memberObj.lastname,
        type: typeSelect.value,
        price: parseFloat(priceInput.value),
        start: startInput.value,
        end: endInput.value
      };
    }
    return s;
  });

  saveSubscriptions(subs);
  renderSubscriptions();

  form.reset();
  editField.value = "";
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
}

// Rendu dans tableau
function renderSubscriptions() {
  const subs = getSubscriptions();
  tbody.innerHTML = "";
  subs.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.memberName}</td>
      <td>${s.type}</td>
      <td>${s.price} DH</td>
      <td>${s.start}</td>
      <td>${s.end}</td>
      <td>
        <button onclick="editSubscription('${s.id}')">Edit</button>
        <button onclick="deleteSubscription('${s.id}')">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Form events
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!memberSelect.value || !typeSelect.value || !priceInput.value || !startInput.value || !endInput.value) {
    alert("Tous les champs sont obligatoires");
    return;
  }
  addSubscription();
  form.reset();
});

typeSelect.addEventListener("change", function () {
  if (PRICE_RULES[typeSelect.value]) {
    priceInput.value = PRICE_RULES[typeSelect.value];
  }
});

updateBtn.addEventListener("click", updateSubscription);

// Initial setup
document.addEventListener("DOMContentLoaded", function () {
  populateMembersSelect();
  renderSubscriptions();
});
