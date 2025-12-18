const form = document.getElementById('member-form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const phone = document.getElementById('phone');
const age = document.getElementById('age');
const club = document.getElementById('club');
const tbody = document.getElementById('members-table-body');

const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const editId = document.getElementById('edit-id');

// Lire les membres
function getMembers() {
  return JSON.parse(localStorage.getItem('members')) || [];
}

// Sauvegarder
function saveMembers(list) {
  localStorage.setItem('members', JSON.stringify(list));
}

function generateId() {
  return "MEM-" + Date.now();
}

// Ajouter
function addMember() {
  const list = getMembers();

  const member = {
    id: generateId(),
    firstname: firstname.value,
    lastname: lastname.value,
    phone: phone.value,
    age: age.value,
    club: club.value
  };

  list.push(member);
  saveMembers(list);
  render();
}

// Préparer l'édition
function editMember(id) {
  const list = getMembers();
  const member = list.find(m => m.id === id);

  // Pré-remplir formulaire
  firstname.value = member.firstname;
  lastname.value = member.lastname;
  phone.value = member.phone;
  age.value = member.age;
  club.value = member.club;

  editId.value = member.id;

  // Changer les boutons
  addBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

// Mise à jour
function updateMember() {
  const id = editId.value;
  let list = getMembers();

  list = list.map(member => {
    if (member.id === id) {
      return {
        ...member,
        firstname: firstname.value,
        lastname: lastname.value,
        phone: phone.value,
        age: age.value,
        club: club.value
      };
    }
    return member;
  });

  saveMembers(list);
  render();

  // Reset UI
  form.reset();
  editId.value = "";
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
}

// Supprimer
function deleteMember(id) {
  const list = getMembers().filter(m => m.id !== id);
  saveMembers(list);
  render();
}

// Affichage tableau
function render() {
  const list = getMembers();
  tbody.innerHTML = "";

  list.forEach(member => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${member.id}</td>
      <td>${member.firstname}</td>
      <td>${member.lastname}</td>
      <td>${member.phone}</td>
      <td>${member.age}</td>
      <td>${member.club}</td>
      <td>
        <button onclick="editMember('${member.id}')">Edit</button>
        <button onclick="deleteMember('${member.id}')">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Submit: Ajouter
form.addEventListener('submit', function(e) {
  e.preventDefault();
  addMember();
  form.reset();
});

// Click: Mise à jour
updateBtn.addEventListener('click', function() {
  updateMember();
});

document.addEventListener('DOMContentLoaded', render);
