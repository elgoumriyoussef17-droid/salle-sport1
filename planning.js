let planning = JSON.parse(localStorage.getItem('planning')) || [];
let editIndexPlanning = null;

let clubs = JSON.parse(localStorage.getItem('clubs')) || [];
let members = JSON.parse(localStorage.getItem('members')) || []; // si vous voulez associer plus tard
// Ici je récupère les coachs depuis l'objet clubs déjà enregistré
const coaches = clubs.map(c => c.coach);

// Génération ID
function generatePlanningID() {
  return 'PLAN-' + Math.floor(Math.random() * 100000);
}

function savePlanning() {
  localStorage.setItem('planning', JSON.stringify(planning));
}

function renderSelects() {
  // Alimentation du select coach
  coachSelect.innerHTML = `<option disabled selected>Coach</option>`;
  coaches.forEach(co => coachSelect.innerHTML += `<option value="${co}">${co}</option>`);

  // Alimentation du select club
  clubSelect.innerHTML = `<option disabled selected>Club</option>`;
  clubs.forEach(cl => clubSelect.innerHTML += `<option value="${cl.name}">${cl.name}</option>`);
}

function renderPlanning() {
  planningList.innerHTML = "";
  planning.forEach((p, index) => {
    planningList.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.course}</td>
        <td>${p.date}</td>
        <td>${p.time}</td>
        <td>${p.coach}</td>
        <td>${p.club}</td>
        <td>
          <button onclick="editPlanning(${index})">Edit</button>
          <button onclick="deletePlanning(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addPlanning() {
  const course = courseName.value.trim();
  const date = courseDate.value;
  const time = courseTime.value;
  const coach = coachSelect.value;
  const club = clubSelect.value;

  if (!course || !date || !time || !coach || !club) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  if (editIndexPlanning === null) {
    planning.push({
      id: generatePlanningID(),
      course,
      date,
      time,
      coach,
      club
    });
  } else {
    planning[editIndexPlanning].course = course;
    planning[editIndexPlanning].date = date;
    planning[editIndexPlanning].time = time;
    planning[editIndexPlanning].coach = coach;
    planning[editIndexPlanning].club = club;
    editIndexPlanning = null;
  }

  savePlanning();
  renderPlanning();
  clearInputs();
}

function editPlanning(index) {
  const p = planning[index];

  courseName.value = p.course;
  courseDate.value = p.date;
  courseTime.value = p.time;

  coachSelect.value = p.coach;
  clubSelect.value = p.club;

  editIndexPlanning = index;
}

function deletePlanning(index) {
  if (confirm("Supprimer cette séance de planning ?")) {
    planning.splice(index, 1);
    savePlanning();
    renderPlanning();
  }
}

function clearInputs() {
  courseName.value = "";
  courseDate.value = "";
  courseTime.value = "";
  coachSelect.selectedIndex = 0;
  clubSelect.selectedIndex = 0;
}

// Initialisation
renderSelects();
renderPlanning();
