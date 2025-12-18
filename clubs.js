let clubs = JSON.parse(localStorage.getItem('clubs')) || [];
let editIndex = null;

// Génération d'un ID unique
function generateID() {
  return 'CLUB-' + Math.floor(Math.random() * 100000);
}

function saveClubs() {
  localStorage.setItem('clubs', JSON.stringify(clubs));
}

function renderClubs() {
  clubList.innerHTML = "";
  clubs.forEach((c, index) => {
    clubList.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.coach}</td>
        <td>${c.phone}</td>
        <td>
          <button onclick="editClub(${index})">Edit</button>
          <button onclick="deleteClub(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addClub() {
  const name = clubName.value.trim();
  const coach = coachName.value.trim();
  const phone = coachPhone.value.trim();

  if (!name || !coach || !phone) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  if (editIndex === null) {
    clubs.push({
      id: generateID(),
      name,
      coach,
      phone
    });
  } else {
    clubs[editIndex].name = name;
    clubs[editIndex].coach = coach;
    clubs[editIndex].phone = phone;
    editIndex = null;
  }

  saveClubs();
  renderClubs();
  clubName.value = coachName.value = coachPhone.value = "";
}

function editClub(index) {
  const c = clubs[index];
  clubName.value = c.name;
  coachName.value = c.coach;
  coachPhone.value = c.phone;
  editIndex = index;
}

function deleteClub(index) {
  if (confirm("Supprimer ce club ?")) {
    clubs.splice(index, 1);
    saveClubs();
    renderClubs();
  }
}

renderClubs();
